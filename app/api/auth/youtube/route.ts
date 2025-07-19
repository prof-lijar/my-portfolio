import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.YOUTUBE_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "YouTube client ID not configured" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    clientId: clientId,
    scope: "https://www.googleapis.com/auth/youtube.upload",
  });
}
