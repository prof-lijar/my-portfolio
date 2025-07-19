# Vercel Deployment Guide

## 🚨 Vercel File Upload Limits

- **Serverless Functions**: 4.5MB max
- **Edge Functions**: 1MB max
- **Your video**: 13.28MB (exceeds limits!)

## 🔧 Solutions for Large File Uploads

### **Option 1: Use Smaller Files (Recommended for Now)**

For files under 4MB, the current implementation works perfectly on Vercel.

### **Option 2: Implement Client-Side Upload**

For larger files, we need to upload directly from the browser to YouTube.

### **Option 3: Use External Storage**

Upload to cloud storage first, then process.

## 📋 Vercel Deployment Steps

### **1. Set Environment Variables in Vercel**

Go to your Vercel project dashboard → Settings → Environment Variables:

```env
YOUTUBE_CLIENT_ID=your_client_id_here
YOUTUBE_CLIENT_SECRET=your_client_secret_here
YOUTUBE_REDIRECT_URI=https://your-domain.vercel.app/api/auth/callback/google
YOUTUBE_REFRESH_TOKEN=your_refresh_token_here
```

### **2. Update Redirect URI**

Make sure your Google Cloud Console OAuth credentials include:

```
https://your-domain.vercel.app/api/auth/callback/google
```

### **3. Deploy to Vercel**

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy
vercel --prod
```

## 🛠️ Current Implementation Status

### **✅ What Works on Vercel:**

- Files under 4MB upload successfully
- Progress tracking and UI
- Error handling
- YouTube API integration

### **⚠️ What Needs Work:**

- Files over 4MB get 413 error
- Client-side upload not yet implemented

## 🔄 Testing Your Deployment

### **1. Test Small Files (< 4MB)**

1. Go to your deployed site
2. Upload a small video file
3. Verify it works correctly

### **2. Test Large Files (> 4MB)**

1. Try uploading your 13.28MB file
2. You'll get a 413 error (expected)
3. The app will suggest using smaller files

## 🚀 Next Steps for Large Files

### **Option A: Compress Videos**

- Use video compression tools
- Target file size under 4MB
- Maintain reasonable quality

### **Option B: Implement Client-Side Upload**

This requires:

1. YouTube API client library in browser
2. OAuth flow for client-side
3. Direct upload to YouTube

### **Option C: Use External Storage**

1. Upload to AWS S3/Cloudinary
2. Process with serverless function
3. Upload to YouTube from server

## 📊 File Size Recommendations

### **For Vercel Deployment:**

- **Optimal**: < 2MB
- **Acceptable**: < 4MB
- **Too Large**: > 4MB

### **For Your 13.28MB File:**

- **Compress to 720p**: ~3-4MB
- **Compress to 480p**: ~2-3MB
- **Use external storage**: Any size

## 🔧 Vercel Configuration

### **vercel.json (Optional)**

```json
{
  "functions": {
    "app/api/upload/route.ts": {
      "maxDuration": 300
    }
  }
}
```

### **Environment Variables**

Make sure these are set in Vercel dashboard:

- `YOUTUBE_CLIENT_ID`
- `YOUTUBE_CLIENT_SECRET`
- `YOUTUBE_REDIRECT_URI`
- `YOUTUBE_REFRESH_TOKEN`

## 🧪 Testing Commands

### **Local Testing:**

```bash
npm run dev
npm run verify-youtube
```

### **Production Testing:**

1. Deploy to Vercel
2. Test with small files first
3. Verify YouTube uploads work
4. Check error handling for large files

## 📈 Performance on Vercel

### **Expected Upload Times:**

- **1MB file**: 10-30 seconds
- **2MB file**: 20-60 seconds
- **3MB file**: 30-90 seconds
- **4MB file**: 40-120 seconds

### **Limitations:**

- Serverless function timeout: 10 seconds (free), 60 seconds (pro)
- Memory limit: 1024MB
- File size: 4.5MB max

## 🎯 Recommended Approach

### **For Portfolio/Demo:**

1. **Use compressed videos** under 4MB
2. **Show the upload functionality** working
3. **Document the limitations** clearly

### **For Production:**

1. **Implement client-side upload** for large files
2. **Use external storage** as backup
3. **Add video compression** options

## 🔍 Troubleshooting

### **Common Issues:**

- **413 Error**: File too large for Vercel
- **401 Error**: YouTube credentials not set
- **Timeout**: File too large or slow connection
- **CORS Error**: Check redirect URIs

### **Solutions:**

- **413**: Use smaller files or implement client-side upload
- **401**: Set environment variables in Vercel
- **Timeout**: Compress videos or use external storage
- **CORS**: Update redirect URIs in Google Cloud Console
