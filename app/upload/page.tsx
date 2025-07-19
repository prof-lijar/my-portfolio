"use client";
import { useState, useRef, useEffect } from "react";

interface UploadResult {
  videoId: string;
  url: string;
  uploadTime: number;
  fileSize: number;
  uploadSpeed: string;
}

// Google Identity Services for browser
declare global {
  interface Window {
    google: any;
  }
}

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [uploadSpeed, setUploadSpeed] = useState<string>("");
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [isYouTubeApiLoaded, setIsYouTubeApiLoaded] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [clientId, setClientId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [debugInfo, setDebugInfo] = useState<string>("Starting...");
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  // Load YouTube API
  useEffect(() => {
    const loadYouTubeAPI = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setDebugInfo("Fetching credentials...");

        // Get client ID from API
        const response = await fetch("/api/auth/youtube");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to get YouTube credentials");
        }

        setClientId(data.clientId);
        setDebugInfo(
          "Credentials received, loading Google Identity Services..."
        );

        // Load Google Identity Services
        await loadGoogleIdentityServices(data.clientId);
      } catch (error: any) {
        console.error("Error loading YouTube API:", error);
        setError("Failed to load YouTube API: " + error.message);
        setDebugInfo("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const loadGoogleIdentityServices = (clientId: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if already loaded
        if (window.google && window.google.accounts) {
          setDebugInfo(
            "Google Identity Services already loaded, initializing..."
          );
          initGoogleIdentityServices(clientId).then(resolve).catch(reject);
          return;
        }

        setDebugInfo("Loading Google Identity Services...");

        // Create script element
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;

        // Set up callback for when script loads
        script.onload = async () => {
          try {
            setDebugInfo("Google Identity Services loaded, initializing...");
            await initGoogleIdentityServices(clientId);
            resolve();
          } catch (error) {
            reject(error);
          }
        };

        script.onerror = () => {
          reject(new Error("Failed to load Google Identity Services"));
        };

        // Add script to document
        document.head.appendChild(script);
      });
    };

    const initGoogleIdentityServices = async (clientId: string) => {
      try {
        setDebugInfo("Initializing Google Identity Services...");

        if (!window.google || !window.google.accounts) {
          throw new Error("Google Identity Services not available");
        }

        setDebugInfo("Creating token client...");

        // Create token client for YouTube API
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: "https://www.googleapis.com/auth/youtube.upload",
          callback: (tokenResponse: any) => {
            if (tokenResponse.error) {
              setError("Authentication failed: " + tokenResponse.error);
              setDebugInfo("Authentication error: " + tokenResponse.error);
            } else {
              setIsAuthenticated(true);
              setAccessToken(tokenResponse.access_token);
              setError(null);
              setDebugInfo("Authentication successful! Access token received.");
            }
          },
        });

        setTokenClient(client);
        setIsYouTubeApiLoaded(true);
        setDebugInfo("Google Identity Services initialized successfully!");
      } catch (error: any) {
        console.error("Error initializing Google Identity Services:", error);
        throw new Error(
          "Failed to initialize Google Identity Services: " + error.message
        );
      }
    };

    loadYouTubeAPI();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
    setError(null);
    setResult(null);
    setUploadPercentage(0);

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      console.log(
        `Selected file: ${file.name}, Size: ${fileSizeInMB.toFixed(2)} MB`
      );

      // Auto-generate title from filename if empty
      if (!title) {
        const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
        setTitle(fileName);
      }
    }
  };

  const signInToYouTube = async () => {
    try {
      setDebugInfo("Attempting to sign in...");

      if (!tokenClient) {
        throw new Error("Token client not available");
      }

      setDebugInfo("Requesting authentication...");
      tokenClient.requestAccessToken();
    } catch (error: any) {
      console.error("Sign-in error:", error);
      setError("Failed to sign in to YouTube: " + error.message);
      setDebugInfo("Sign-in error: " + error.message);
    }
  };

  const signOutFromYouTube = async () => {
    try {
      if (window.google && window.google.accounts) {
        window.google.accounts.oauth2.revoke(accessToken, () => {
          setIsAuthenticated(false);
          setAccessToken("");
          setDebugInfo("Signed out");
        });
      }
    } catch (error: any) {
      console.error("Sign-out error:", error);
    }
  };

  const uploadToYouTube = async (file: File): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      let lastProgressUpdate = startTime;

      // Check if we have access token
      if (!accessToken) {
        reject(new Error("No access token available. Please sign in again."));
        return;
      }

      // Create metadata
      const metadata = {
        snippet: {
          title: title || "Untitled Video",
          description: description || "",
          tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
          categoryId: "22", // People & Blogs
        },
        status: {
          privacyStatus: "unlisted",
          selfDeclaredMadeForKids: false,
        },
      };

      // Create upload request using fetch API
      const formData = new FormData();
      formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      formData.append("media", file);

      const xhr = new XMLHttpRequest();

      // Handle upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadPercentage(progress);

          const elapsed = (Date.now() - startTime) / 1000;
          setUploadProgress(
            `Uploading... ${progress.toFixed(1)}% (${elapsed.toFixed(1)}s)`
          );

          // Calculate speed every 5 seconds
          if (Date.now() - lastProgressUpdate >= 5000) {
            const fileSizeInMB = file.size / (1024 * 1024);
            const speed = fileSizeInMB / elapsed;
            setUploadSpeed(`Speed: ${speed.toFixed(2)} MB/s`);
            lastProgressUpdate = Date.now();
          }
        }
      });

      // Handle upload completion
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const endTime = Date.now();
          const uploadDuration = (endTime - startTime) / 1000;
          const fileSizeInMB = file.size / (1024 * 1024);

          const result: UploadResult = {
            videoId: response.id,
            url: `https://www.youtube.com/watch?v=${response.id}`,
            uploadTime: uploadDuration,
            fileSize: fileSizeInMB,
            uploadSpeed: (fileSizeInMB / uploadDuration).toFixed(2),
          };

          resolve(result);
        } else {
          reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      // Start upload
      xhr.open(
        "POST",
        "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&uploadType=multipart"
      );
      xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
      xhr.send(formData);
    });
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setUploading(true);
    setError(null);
    setResult(null);
    setUploadProgress("Starting upload...");
    setUploadSpeed("");
    setUploadPercentage(0);

    try {
      if (!isYouTubeApiLoaded) {
        throw new Error("YouTube API not loaded");
      }

      if (!isAuthenticated) {
        throw new Error("Please sign in to YouTube first");
      }

      if (!accessToken) {
        throw new Error("No access token available. Please sign in again.");
      }

      setUploadProgress("Uploading directly to YouTube...");
      const result = await uploadToYouTube(videoFile);
      setResult(result);
      setUploadPercentage(100);
      setUploadProgress(
        `Upload completed in ${result.uploadTime.toFixed(2)} seconds`
      );

      console.log("Upload successful:", result);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed");
      setUploadProgress("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const getEstimatedTime = (fileSize: number) => {
    // Rough estimate: 1 MB per second (varies by connection)
    const estimatedSeconds = fileSize / (1024 * 1024);
    if (estimatedSeconds < 60) {
      return `${Math.ceil(estimatedSeconds)} seconds`;
    } else {
      return `${Math.ceil(estimatedSeconds / 60)} minutes`;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Video to YouTube</h1>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-600 mb-2">Loading YouTube API...</p>
          <p className="text-xs text-blue-500">{debugInfo}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Video to YouTube</h1>

      {/* YouTube Authentication */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-medium text-blue-800 mb-2">
          YouTube Authentication Required
        </h3>
        {!isYouTubeApiLoaded ? (
          <div>
            <p className="text-sm text-blue-600 mb-2">Loading YouTube API...</p>
            <p className="text-xs text-blue-500">{debugInfo}</p>
          </div>
        ) : !isAuthenticated ? (
          <div>
            <p className="text-sm text-blue-600 mb-2">
              Please sign in to YouTube to upload videos.
            </p>
            <button
              onClick={signInToYouTube}
              className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700"
            >
              Sign in to YouTube
            </button>
            <p className="text-xs text-blue-500 mt-1">{debugInfo}</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-green-600 mb-2">
              ✓ Authenticated with YouTube
            </p>
            <button
              onClick={signOutFromYouTube}
              className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              Sign Out
            </button>
            <p className="text-xs text-green-500 mt-1">{debugInfo}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* File Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Video File
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            Any file size supported - direct upload to YouTube
          </p>
        </div>

        {/* Video Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full p-2 border border-gray-300 rounded"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">
              {title.length}/100 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate tags with commas
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={5000}
          />
          <p className="text-xs text-gray-500 mt-1">
            {description.length}/5000 characters
          </p>
        </div>

        {/* File Info */}
        {videoFile && (
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm">
              <strong>File:</strong> {videoFile.name}
            </p>
            <p className="text-sm">
              <strong>Size:</strong> {formatFileSize(videoFile.size)}
            </p>
            <p className="text-sm">
              <strong>Type:</strong> {videoFile.type}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Estimated upload time: {getEstimatedTime(videoFile.size)}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              🚀 Direct upload to YouTube - no server limits!
            </p>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={
              !videoFile || uploading || !title.trim() || !isAuthenticated
            }
            className={`flex-1 px-4 py-2 rounded font-medium ${
              !videoFile || uploading || !title.trim() || !isAuthenticated
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload to YouTube"}
          </button>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="mb-2">
              <div className="flex justify-between text-sm text-blue-800 mb-1">
                <span>{uploadProgress}</span>
                <span>{uploadPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadPercentage}%` }}
                ></div>
              </div>
            </div>
            {uploadSpeed && (
              <p className="text-xs text-blue-600 mt-1">{uploadSpeed}</p>
            )}
            <p className="text-xs text-blue-600 mt-1">
              Uploading directly to YouTube - no server limits!
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Success Display */}
        {result && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800 mb-2">
              <strong>Upload successful!</strong>
            </p>
            <p className="text-xs text-green-700 mb-2">
              Upload time: {result.uploadTime.toFixed(2)} seconds
              <br />
              File size: {result.fileSize.toFixed(2)} MB
              <br />
              Average speed: {result.uploadSpeed} MB/s
              <br />
              Method: Client-side direct upload
            </p>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              View on YouTube →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
