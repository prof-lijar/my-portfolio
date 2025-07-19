// app/api/upload/route.ts
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID!;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI!;
const REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN!;

// Validate environment variables
if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
  console.error("Missing YouTube API credentials in environment variables");
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const youtube = google.youtube({ version: "v3", auth: oauth2Client });

// Helper function to create a readable stream from buffer
function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

// Helper function to parse form data manually
async function parseFormData(req: NextRequest) {
  const formData = await req.formData();
  const fields: Record<string, string[]> = {};
  const files: Record<string, any[]> = {};

  for (const [key, value] of Array.from(formData.entries())) {
    if (value instanceof File) {
      // Handle file upload
      const bytes = await value.arrayBuffer();
      const buffer = new Uint8Array(bytes);

      if (!files[key]) files[key] = [];
      files[key].push({
        originalFilename: value.name,
        mimetype: value.type,
        size: value.size,
        buffer: buffer,
      });
    } else {
      // Handle text fields
      if (!fields[key]) fields[key] = [];
      fields[key].push(value as string);
    }
  }

  return { fields, files };
}

export async function POST(req: NextRequest) {
  console.log("Starting hybrid upload process...");

  // Check if credentials are available
  if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "YouTube API credentials not configured" },
      { status: 500 }
    );
  }

  try {
    // Parse form data
    const data = await parseFormData(req);

    const videoFiles = data.files.video;
    if (!videoFiles || !Array.isArray(videoFiles) || videoFiles.length === 0) {
      console.error("No video file found in request");
      return NextResponse.json(
        { error: "No video file provided" },
        { status: 400 }
      );
    }

    const file = videoFiles[0];
    console.log(
      `File received: ${file.originalFilename}, Size: ${file.size} bytes`
    );

    // Check file size
    const actualFileSizeInMB = file.size / (1024 * 1024);
    console.log(`File size: ${actualFileSizeInMB.toFixed(2)} MB`);

    // Create video metadata
    const videoMetadata = {
      snippet: {
        title: data.fields.title?.[0] || "Untitled Video",
        description: data.fields.description?.[0] || "",
        tags:
          data.fields.tags?.[0]?.split(",").map((tag: string) => tag.trim()) ||
          [],
        categoryId: "22", // People & Blogs category
      },
      status: {
        privacyStatus: "unlisted",
        selfDeclaredMadeForKids: false,
      },
    };

    console.log("Creating resumable upload session...");

    // Convert buffer to readable stream
    const fileStream = bufferToStream(Buffer.from(file.buffer));

    // Step 1: Create resumable upload session with proper media body
    const resumableUpload = youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: videoMetadata,
      media: {
        body: fileStream, // Use readable stream instead of buffer
        mimeType: file.mimetype || "video/*",
      },
      uploadType: "resumable",
    });

    // Get the upload URL from the resumable upload response
    const response = await resumableUpload;

    // Extract the upload URL from the response headers or config
    let uploadUrl = "";

    if (response.config && response.config.url) {
      uploadUrl =
        typeof response.config.url === "string"
          ? response.config.url
          : response.config.url.toString();
    } else if (response.headers && response.headers.location) {
      // Get from Location header (most common for resumable uploads)
      const locationHeader = response.headers.location;
      uploadUrl = Array.isArray(locationHeader)
        ? locationHeader[0]
        : locationHeader;
    } else {
      // Fallback: try to construct from response data
      console.warn("Could not extract upload URL from headers, using fallback");
      uploadUrl = `https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&uploadType=resumable`;
    }

    if (!uploadUrl) {
      console.error("Failed to extract upload URL from response:", response);
      throw new Error(
        "Failed to create upload session - no upload URL received"
      );
    }

    console.log("Upload session created successfully");
    console.log("Upload URL:", uploadUrl);

    // Step 2: Get fresh access token for client-side upload
    const { token: accessToken } = await oauth2Client.getAccessToken();

    if (!accessToken) {
      throw new Error("Failed to get access token");
    }

    console.log("Access token obtained for client-side upload");

    // Return upload information for client-side processing
    return NextResponse.json({
      uploadUrl: uploadUrl,
      accessToken: accessToken,
      metadata: videoMetadata,
      fileInfo: {
        name: file.originalFilename,
        size: file.size,
        mimeType: file.mimetype,
        sizeInMB: actualFileSizeInMB,
      },
      message: "Upload session created. Proceed with client-side upload.",
    });
  } catch (error: any) {
    console.error("Upload session creation error:", {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack,
    });

    // Handle specific YouTube API errors
    let errorMessage = "Failed to create upload session";
    let statusCode = 500;

    if (error.code === 400) {
      if (error.message.includes("mediaBodyRequired")) {
        errorMessage = "No video content provided";
      } else if (error.message.includes("invalidTitle")) {
        errorMessage = "Invalid video title";
      } else if (error.message.includes("invalidDescription")) {
        errorMessage = "Invalid video description";
      } else if (error.message.includes("uploadLimitExceeded")) {
        errorMessage = "Upload limit exceeded";
      } else {
        errorMessage = "Invalid request parameters: " + error.message;
      }
      statusCode = 400;
    } else if (error.code === 401) {
      errorMessage =
        "YouTube API authentication failed. Check your credentials.";
      statusCode = 401;
    } else if (error.code === 403) {
      errorMessage = "YouTube API quota exceeded or insufficient permissions.";
      statusCode = 403;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.message,
        code: error.code,
      },
      { status: statusCode }
    );
  }
}
