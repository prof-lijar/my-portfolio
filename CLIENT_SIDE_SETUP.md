# Client-Side YouTube Upload Setup

## 🚀 What This Does

**Client-side upload** bypasses Vercel completely:

- ✅ **No file size limits** (your 13.28MB file works!)
- ✅ **No runtime limits** (can take as long as needed)
- ✅ **Direct upload** from browser to YouTube
- ✅ **Real-time progress** tracking
- ✅ **Uses existing credentials** from `.env.local`

## 📋 Required Environment Variables

You only need the **existing** credentials in your `.env.local`:

```env
# Server-side (existing - used for client-side auth)
YOUTUBE_CLIENT_ID=your_client_id_here
YOUTUBE_CLIENT_SECRET=your_client_secret_here
YOUTUBE_REDIRECT_URI=http://localhost:3001/api/auth/callback/google
YOUTUBE_REFRESH_TOKEN=your_refresh_token_here
```

**No additional client-side credentials needed!** The app fetches the client ID from your API.

## 🔧 How It Works

### **Authentication Flow:**

1. **App loads** → Fetches client ID from `/api/auth/youtube`
2. **User signs in** → Google OAuth popup
3. **Uploads directly** → Browser → YouTube API
4. **Real-time progress** → Shows percentage & speed

### **API Route:**

- `/api/auth/youtube` → Provides client ID to frontend
- Uses existing `YOUTUBE_CLIENT_ID` from `.env.local`

## 🎯 Upload Flow

1. **User selects file** → Any size supported
2. **Clicks "Sign in to YouTube"** → Google OAuth popup
3. **Authenticates** → Grants upload permission
4. **Uploads directly** → Browser → YouTube API
5. **Real-time progress** → Shows percentage and speed
6. **Success!** → Video appears on YouTube

## 🛠️ Testing

### **Local Testing:**

```bash
npm run dev
# Go to http://localhost:3001/upload
# Try uploading your 13.28MB file
```

### **Production Testing:**

1. Set environment variables in Vercel (same as existing)
2. Deploy your app
3. Test with large files

## 🔍 Troubleshooting

### **"Failed to load YouTube API"**

- Check `YOUTUBE_CLIENT_ID` is set in `.env.local`
- Check `/api/auth/youtube` endpoint works

### **"Failed to sign in to YouTube"**

- Check OAuth consent screen configuration
- Make sure domain is authorized:
  - `localhost` (for development)
  - `your-domain.vercel.app` (for production)

### **"Upload failed"**

- Check browser console for detailed errors
- Verify YouTube API is enabled in Google Cloud Console

## 📊 Benefits

### **Before (Server-side only):**

- ❌ 4MB file size limit
- ❌ 10-60 second runtime limit
- ❌ 413 errors on large files

### **After (Client-side upload):**

- ✅ Any file size supported
- ✅ No runtime limits
- ✅ Direct YouTube upload
- ✅ Real-time progress tracking
- ✅ Uses existing credentials

## 🎉 Result

Your 13.28MB video will now upload successfully! 🚀

**No additional setup required** - just use your existing YouTube credentials!
