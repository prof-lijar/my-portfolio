# YouTube API Setup Guide

## Why Uploads Are Slow/Failing

Your YouTube uploads are taking a long time or failing because:

1. **Missing API Credentials** - Environment variables are not set
2. **Not Using Resumable Uploads** - Basic uploads are slower and less reliable
3. **Large File Processing** - 13.9MB files take time to upload and process
4. **Timeout Issues** - Server/client timeouts for large files
5. **Network Issues** - Slow internet connection or unstable network

## Setup YouTube API Credentials

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**

### 2. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - Your production domain (for production)

### 3. Get Refresh Token

1. Use the OAuth 2.0 Playground: https://developers.google.com/oauthplayground/
2. Set your OAuth 2.0 credentials
3. Select "YouTube Data API v3" > "YouTube: Upload, edit, and delete YouTube videos"
4. Exchange authorization code for refresh token

### 4. Set Environment Variables

Create a `.env.local` file in your project root:

```env
YOUTUBE_CLIENT_ID=your_client_id_here
YOUTUBE_CLIENT_SECRET=your_client_secret_here
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
YOUTUBE_REFRESH_TOKEN=your_refresh_token_here
```

## Performance Improvements Made

### 1. Resumable Uploads (Official API Requirement)

- Added `uploadType: 'resumable'` for better reliability
- Handles network interruptions better
- More efficient for large files
- **Required by YouTube API for files > 5MB**

### 2. Timeout Handling

- **Server-side timeout**: 5 minutes minimum, scales with file size
- **Client-side timeout**: Matches server timeout
- **Progress tracking**: Real-time upload progress with percentage
- **Graceful error handling**: Specific timeout error messages

### 3. Progress Tracking

- Real-time upload speed calculation
- Visual progress bar with percentage
- Estimated completion time
- Upload cancellation support

### 4. Enhanced Error Handling

- Specific error messages for different failure types
- Better logging for debugging
- Graceful handling of API quota limits
- Network error recovery

## Expected Upload Times

For a 13.9MB file:

- **Fast connection (10+ Mbps)**: 10-30 seconds
- **Average connection (5 Mbps)**: 30-60 seconds
- **Slow connection (1 Mbps)**: 2-5 minutes

## YouTube API Best Practices

### 1. Use Resumable Uploads

```javascript
// ✅ Correct - Resumable upload with timeout
const uploadRequest = youtube.videos.insert({
  part: ["snippet", "status"],
  requestBody: videoMetadata,
  media: {
    body: progressStream,
    mimeType: file.mimetype || "video/*",
  },
  uploadType: "resumable", // Required for large files
});

// Set timeout based on file size
const timeout = Math.max(300000, file.size * 10); // At least 5 minutes
```

### 2. Progress Tracking

```javascript
// Real-time progress tracking
const progressStream = createProgressStream(
  file.filepath,
  (bytesRead, totalBytes) => {
    const progress = (bytesRead / totalBytes) * 100;
    console.log(`Upload progress: ${progress.toFixed(2)}%`);
  }
);
```

### 3. Error Handling

- Handle specific YouTube API error codes
- Provide meaningful error messages
- Graceful handling of quota limits
- Timeout recovery suggestions

## Troubleshooting Upload Issues

### Upload Times Out?

1. **Check file size** - Try with smaller files first (1-2MB)
2. **Test internet speed** - Use speedtest.net to check upload speed
3. **Check network stability** - Try uploading from different network
4. **Verify API credentials** - Ensure all environment variables are set
5. **Monitor server logs** - Check for detailed error messages

### Common Timeout Solutions:

- **Reduce file size**: Compress video or use lower resolution
- **Use better connection**: Try uploading from faster internet
- **Split large files**: Upload in smaller chunks if possible
- **Retry upload**: Sometimes network issues resolve on retry

### Getting API Errors?

- **400**: Invalid request parameters (check title, description)
- **401**: Authentication failed (check refresh token)
- **403**: Quota exceeded or insufficient permissions
- **408**: Upload timeout (file too large or connection too slow)
- **413**: File too large (max 256GB)

### Network Issues?

1. **Check upload speed**: Should be at least 1 Mbps for reliable uploads
2. **Test connection stability**: Uploads can fail on unstable connections
3. **Try different times**: Network congestion varies throughout the day
4. **Use wired connection**: WiFi can be less reliable for large uploads

## Testing Your Setup

1. **Test with small file first** (1-2MB)
2. **Check environment variables** are loaded
3. **Monitor upload progress** in the UI
4. **Verify video appears** on YouTube after upload
5. **Test timeout handling** with larger files

## Need Even Faster Uploads?

For production applications:

- **Use YouTube's direct upload feature**
- **Implement chunked uploads** for very large files
- **Use a CDN** for initial file storage
- **Consider server-side processing** for video optimization
- **Use dedicated upload servers** with better bandwidth

## Timeout Configuration

The system now includes:

- **Dynamic timeouts**: Scales with file size
- **Progress tracking**: Real-time upload progress
- **Graceful cancellation**: Can cancel long uploads
- **Better error messages**: Specific timeout guidance
- **Retry logic**: Automatic retry for network issues
