// scripts/get-refresh-token.js
const { google } = require("googleapis");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function getRefreshToken() {
  console.log("🔑 YouTube Refresh Token Generator\n");
  console.log(
    "This script will help you get a refresh token for YouTube API.\n"
  );

  // Get credentials from user
  const clientId = await question("Enter your CLIENT_ID: ");
  const clientSecret = await question("Enter your CLIENT_SECRET: ");
  const redirectUri =
    (await question(
      "Enter your REDIRECT_URI (default: http://localhost:3001/api/auth/callback/google): "
    )) || "http://localhost:3001/api/auth/callback/google";

  console.log("\n📋 Your credentials:");
  console.log(`Client ID: ${clientId}`);
  console.log(`Client Secret: ${clientSecret}`);
  console.log(`Redirect URI: ${redirectUri}\n`);

  // Create OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  // Generate authorization URL
  const scopes = ["https://www.googleapis.com/auth/youtube.upload"];
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent", // Force consent to get refresh token
  });

  console.log("🔗 Authorization URL:");
  console.log(authUrl);
  console.log("\n📝 Instructions:");
  console.log("1. Copy and paste the URL above into your browser");
  console.log("2. Sign in with your Google account");
  console.log("3. Grant permissions for YouTube upload");
  console.log("4. Copy the authorization code from the redirect URL\n");

  const authCode = await question("Enter the authorization code: ");

  try {
    // Exchange auth code for tokens
    const { tokens } = await oauth2Client.getToken(authCode);

    console.log("\n✅ Success! Here are your tokens:\n");
    console.log("🔑 REFRESH_TOKEN:");
    console.log(tokens.refresh_token);
    console.log("\n📄 ACCESS_TOKEN:");
    console.log(tokens.access_token);
    console.log("\n📋 Add this to your .env.local file:");
    console.log(`YOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}`);

    // Test the credentials
    console.log("\n🧪 Testing credentials...");
    oauth2Client.setCredentials(tokens);

    const youtube = google.youtube({ version: "v3", auth: oauth2Client });
    const response = await youtube.channels.list({
      part: ["snippet"],
      mine: true,
    });

    if (response.data.items && response.data.items.length > 0) {
      const channel = response.data.items[0];
      console.log("✅ Credentials working!");
      console.log(`📺 Channel: ${channel.snippet.title}`);
      console.log(`🆔 Channel ID: ${channel.id}`);
    }
  } catch (error) {
    console.log("❌ Error getting tokens:");
    console.log(error.message);
  }

  rl.close();
}

getRefreshToken().catch(console.error);
