# YouTube API Credentials Setup Guide

## Current Issue: 401 Unauthorized Client

The error `unauthorized_client` with code 401 means your YouTube API credentials are not properly configured. Let's fix this step by step.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "YouTube Upload API")
4. Click "Create"

## Step 2: Enable YouTube Data API

1. In your new project, go to "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen:

   - User Type: External
   - App name: Your app name
   - User support email: Your email
   - Developer contact information: Your email
   - Save and continue through all steps

4. Back to creating OAuth 2.0 Client ID:

   - Application type: Web application
   - Name: "YouTube Upload Client"
   - Authorized redirect URIs: Add these:
     ```
     http://localhost:3001/api/auth/callback/google
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"

5. **Save the Client ID and Client Secret** - you'll need these!

## Step 4: Get Refresh Token

1. Go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the settings icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret from Step 3
5. Click "Close"

6. In the left panel, scroll down to "YouTube Data API v3"
7. Select "YouTube: Upload, edit, and delete YouTube videos"
8. Click "Authorize APIs"

9. Sign in with your Google account and grant permissions
10. Click "Exchange authorization code for tokens"
11. **Copy the Refresh Token** - you'll need this!

## Step 5: Create Environment File

Create a `.env.local` file in your project root:

```env
YOUTUBE_CLIENT_ID=your_client_id_here
YOUTUBE_CLIENT_SECRET=your_client_secret_here
YOUTUBE_REDIRECT_URI=http://localhost:3001/api/auth/callback/google
YOUTUBE_REFRESH_TOKEN=your_refresh_token_here
```

**Replace the placeholder values with your actual credentials from Steps 3 and 4.**

## Step 6: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Step 7: Test Upload

1. Go to http://localhost:3001/upload
2. Select a small video file (1-2MB)
3. Fill in title, description, and tags
4. Click "Upload to YouTube"
5. Check console for success messages

## Expected Success Output

```
Starting video upload process...
File received: video.mp4, Size: 2097152 bytes
File size: 2.00 MB
Starting YouTube resumable upload...
Setting upload timeout to 300.00 seconds
Upload progress: 25.50%
Upload progress: 50.25%
Upload progress: 75.80%
Upload progress: 100.00%
Upload completed successfully in 15.23 seconds
Video ID: dQw4w9WgXcQ
Video URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Temporary file cleaned up
```

## Troubleshooting

### Still Getting 401 Error?

1. **Check credentials**: Verify all 4 environment variables are set correctly
2. **Restart server**: Environment variables only load on server restart
3. **Check redirect URI**: Must match exactly (including port number)
4. **Verify API enabled**: Make sure YouTube Data API v3 is enabled
5. **Check refresh token**: Must be fresh from OAuth Playground

### Common Issues:

- **"Invalid client"**: Check Client ID and Client Secret
- **"Invalid refresh token"**: Get a new refresh token from OAuth Playground
- **"Redirect URI mismatch"**: Update redirect URI in Google Cloud Console
- **"API not enabled"**: Enable YouTube Data API v3

### Security Notes:

- Never commit `.env.local` to version control
- Keep your credentials secure
- Refresh tokens can expire - you may need to regenerate them

## Next Steps

Once upload is working:

1. Test with larger files
2. Set up production credentials
3. Configure proper redirect URIs for production
4. Monitor API quota usage
