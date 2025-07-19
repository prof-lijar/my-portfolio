// scripts/verify-youtube-credentials.js
const { google } = require("googleapis");
require("dotenv").config({ path: ".env.local" });

async function verifyCredentials() {
  console.log("🔍 Verifying YouTube API Credentials...\n");

  // Check environment variables
  const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
  const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
  const REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI;
  const REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN;

  console.log("Environment Variables:");
  console.log(`✅ CLIENT_ID: ${CLIENT_ID ? "SET" : "❌ MISSING"}`);
  console.log(`✅ CLIENT_SECRET: ${CLIENT_SECRET ? "SET" : "❌ MISSING"}`);
  console.log(`✅ REDIRECT_URI: ${REDIRECT_URI ? "SET" : "❌ MISSING"}`);
  console.log(`✅ REFRESH_TOKEN: ${REFRESH_TOKEN ? "SET" : "❌ MISSING"}\n`);

  if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
    console.log(
      "❌ Missing environment variables. Please set up your .env.local file."
    );
    console.log("📖 Follow the guide: YOUTUBE_CREDENTIALS_SETUP.md");
    return;
  }

  try {
    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    // Set credentials
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Create YouTube API client
    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    // Test API call - get channel info
    console.log("🔄 Testing API connection...");
    const response = await youtube.channels.list({
      part: ["snippet"],
      mine: true,
    });

    if (response.data.items && response.data.items.length > 0) {
      const channel = response.data.items[0];
      console.log("✅ API connection successful!");
      console.log(`📺 Channel: ${channel.snippet.title}`);
      console.log(`🆔 Channel ID: ${channel.id}`);
      console.log(
        `📝 Description: ${channel.snippet.description?.substring(0, 100)}...`
      );
      console.log("\n🎉 Your YouTube API credentials are working correctly!");
      console.log("🚀 You can now upload videos.");
    } else {
      console.log("⚠️  API connected but no channel found.");
      console.log(
        "Make sure you have a YouTube channel associated with your account."
      );
    }
  } catch (error) {
    console.log("❌ API connection failed:");
    console.log(`Error: ${error.message}`);

    if (error.code === 401) {
      console.log("\n🔧 Troubleshooting 401 Error:");
      console.log("1. Check your Client ID and Client Secret");
      console.log("2. Verify your Refresh Token is fresh");
      console.log("3. Make sure YouTube Data API v3 is enabled");
      console.log("4. Check redirect URI matches exactly");
    }

    console.log("\n📖 Follow the setup guide: YOUTUBE_CREDENTIALS_SETUP.md");
  }
}

// Run verification
verifyCredentials().catch(console.error);
