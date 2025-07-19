// app/api/upload/route.ts
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  console.log("Providing YouTube authentication...");

  // Check if credentials are available
  if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "YouTube API credentials not configured" },
      { status: 500 }
    );
  }

  try {
    // Parse form data for metadata only (no file)
    const formData = await req.formData();
    const fields: Record<string, string[]> = {};

    for (const [key, value] of Array.from(formData.entries())) {
      if (!(value instanceof File)) {
        // Handle text fields only
        if (!fields[key]) fields[key] = [];
        fields[key].push(value as string);
      }
    }

    // Create video metadata
    const videoMetadata = {
      snippet: {
        title: fields.title?.[0] || "Untitled Video",
        description: fields.description?.[0] || "",
        tags:
          fields.tags?.[0]?.split(",").map((tag: string) => tag.trim()) || [],
        categoryId: "22", // People & Blogs category
      },
      status: {
        privacyStatus: "unlisted",
        selfDeclaredMadeForKids: false,
      },
    };

    console.log("Getting fresh access token...");

    // Get fresh access token for client-side upload
    const { token: accessToken } = await oauth2Client.getAccessToken();

    if (!accessToken) {
      throw new Error("Failed to get access token");
    }

    console.log("Access token obtained successfully");

    // Return authentication info for client-side upload
    return NextResponse.json({
      accessToken: accessToken,
      metadata: videoMetadata,
      uploadUrl:
        "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&uploadType=multipart",
      message:
        "Authentication provided. Upload directly to YouTube using multipart upload.",
    });
  } catch (error: any) {
    console.error("Authentication error:", {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack,
    });

    // Handle specific YouTube API errors
    let errorMessage = "Failed to get authentication";
    let statusCode = 500;

    if (error.code === 400) {
      if (
        error.message.includes("uploadLimitExceeded") ||
        error.message.includes("exceeded the number of videos")
      ) {
        errorMessage =
          "YouTube upload limit exceeded. You've reached the maximum number of videos you can upload today. Please try again tomorrow or check your YouTube account.";
        statusCode = 429; // Too Many Requests
      } else if (error.message.includes("mediaBodyRequired")) {
        errorMessage = "No video content provided";
      } else if (error.message.includes("invalidTitle")) {
        errorMessage = "Invalid video title";
      } else if (error.message.includes("invalidDescription")) {
        errorMessage = "Invalid video description";
      } else {
        errorMessage = "Invalid request parameters: " + error.message;
      }
      statusCode = 400;
    } else if (error.code === 401) {
      errorMessage =
        "YouTube API authentication failed. Check your credentials.";
      statusCode = 401;
    } else if (error.code === 403) {
      if (error.message.includes("quotaExceeded")) {
        errorMessage = "YouTube API quota exceeded. Please try again later.";
      } else {
        errorMessage =
          "YouTube API quota exceeded or insufficient permissions.";
      }
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
