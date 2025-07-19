// app/api/upload/route.ts
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

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

// Helper function to create a readable stream with progress tracking
function createProgressStream(
  filePath: string,
  onProgress?: (bytesRead: number, totalBytes: number) => void
) {
  const stats = fs.statSync(filePath);
  const totalBytes = stats.size;
  let bytesRead = 0;

  const readStream = fs.createReadStream(filePath);

  readStream.on("data", (chunk) => {
    bytesRead += chunk.length;
    if (onProgress) {
      onProgress(bytesRead, totalBytes);
    }
  });

  return readStream;
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

      // Create temporary file
      const tempPath = `/tmp/${Date.now()}-${value.name}`;
      fs.writeFileSync(tempPath, buffer);

      if (!files[key]) files[key] = [];
      files[key].push({
        originalFilename: value.name,
        mimetype: value.type,
        size: value.size,
        filepath: tempPath,
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
  console.log("Starting video upload process...");

  // Check if credentials are available
  if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "YouTube API credentials not configured" },
      { status: 500 }
    );
  }

  try {
    // Check file size before processing
    const contentLength = req.headers.get("content-length");
    const fileSizeInBytes = contentLength ? parseInt(contentLength) : 0;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    console.log(`Request size: ${fileSizeInMB.toFixed(2)} MB`);

    // Vercel has a 4.5MB limit for serverless functions
    if (fileSizeInMB > 4) {
      return NextResponse.json(
        {
          error:
            "File too large for direct upload. Use client-side upload instead.",
          details: `File size ${fileSizeInMB.toFixed(
            2
          )}MB exceeds Vercel's 4.5MB limit`,
          code: 413,
          suggestion: "Use the client-side upload method for large files",
        },
        { status: 413 }
      );
    }

    // Parse form data manually instead of using formidable
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

    // Verify file exists and is readable
    if (!fs.existsSync(file.filepath)) {
      console.error("File does not exist at path:", file.filepath);
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const fileStats = fs.statSync(file.filepath);
    console.log(
      `File stats - Size: ${fileStats.size} bytes, Modified: ${fileStats.mtime}`
    );

    console.log("Starting YouTube resumable upload...");
    const startTime = Date.now();

    // Create video metadata according to official API docs
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

    // Create progress tracking
    let uploadProgress = 0;
    const progressStream = createProgressStream(
      file.filepath,
      (bytesRead, totalBytes) => {
        uploadProgress = (bytesRead / totalBytes) * 100;
        console.log(`Upload progress: ${uploadProgress.toFixed(2)}%`);
      }
    );

    // Use proper resumable upload with timeout and retry logic
    const uploadRequest = youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: videoMetadata,
      media: {
        body: progressStream,
        mimeType: file.mimetype || "video/*",
      },
      // Enable resumable upload for better performance and reliability
      uploadType: "resumable",
    });

    // Set longer timeout for large files (5 minutes)
    const timeout = Math.max(300000, file.size * 10); // At least 5 minutes, or 10ms per byte
    console.log(`Setting upload timeout to ${timeout / 1000} seconds`);

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error("Upload timeout - file too large or connection too slow")
        );
      }, timeout);
    });

    // Race between upload and timeout
    const res = (await Promise.race([uploadRequest, timeoutPromise])) as any;

    const endTime = Date.now();
    const uploadDuration = (endTime - startTime) / 1000;

    console.log(
      `Upload completed successfully in ${uploadDuration.toFixed(2)} seconds`
    );
    console.log(`Video ID: ${res.data.id}`);
    console.log(`Video URL: https://www.youtube.com/watch?v=${res.data.id}`);

    // Clean up the temporary file
    try {
      fs.unlinkSync(file.filepath);
      console.log("Temporary file cleaned up");
    } catch (cleanupError) {
      console.warn("Failed to clean up temporary file:", cleanupError);
    }

    return NextResponse.json({
      videoId: res.data.id,
      url: `https://www.youtube.com/watch?v=${res.data.id}`,
      uploadTime: uploadDuration,
      fileSize: actualFileSizeInMB,
      uploadSpeed: (actualFileSizeInMB / uploadDuration).toFixed(2),
    });
  } catch (error: any) {
    console.error("Upload error details:", {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack,
    });

    // Handle specific YouTube API errors as per official docs
    let errorMessage = "Upload failed";
    let statusCode = 500;

    if (error.message.includes("timeout")) {
      errorMessage =
        "Upload timed out. Try with a smaller file or check your internet connection.";
      statusCode = 408;
    } else if (error.code === 400) {
      if (error.message.includes("mediaBodyRequired")) {
        errorMessage = "No video content provided";
      } else if (error.message.includes("invalidTitle")) {
        errorMessage = "Invalid video title";
      } else if (error.message.includes("invalidDescription")) {
        errorMessage = "Invalid video description";
      } else if (error.message.includes("uploadLimitExceeded")) {
        errorMessage = "Upload limit exceeded";
      } else {
        errorMessage = "Invalid request parameters";
      }
      statusCode = 400;
    } else if (error.code === 401) {
      errorMessage =
        "YouTube API authentication failed. Check your credentials.";
      statusCode = 401;
    } else if (error.code === 403) {
      if (error.message.includes("forbiddenPrivacySetting")) {
        errorMessage = "Invalid privacy setting";
      } else if (error.message.includes("forbiddenLicenseSetting")) {
        errorMessage = "Invalid license setting";
      } else {
        errorMessage =
          "YouTube API quota exceeded or insufficient permissions.";
      }
      statusCode = 403;
    } else if (error.code === 413) {
      errorMessage = "File too large for upload (max 256GB)";
      statusCode = 413;
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
