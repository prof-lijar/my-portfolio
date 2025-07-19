"use client";
import { useState, useRef, useEffect } from "react";

interface UploadResult {
  videoId: string;
  url: string;
  uploadTime: number;
  fileSize: number;
  uploadSpeed: string;
}

interface UploadSession {
  accessToken: string;
  metadata: any;
  uploadUrl: string;
  message: string;
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
  const [isServerReady, setIsServerReady] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<string>("Checking server...");

  // Check server availability
  useEffect(() => {
    const checkServer = async () => {
      try {
        setDebugInfo("Checking server availability...");

        // Test server endpoint
        const response = await fetch("/api/auth/youtube");
        if (response.ok) {
          setIsServerReady(true);
          setDebugInfo("Server ready! Hybrid upload available.");
        } else {
          throw new Error("Server not available");
        }
      } catch (error: any) {
        console.error("Server check error:", error);
        setError("Server not available: " + error.message);
        setDebugInfo("Server error: " + error.message);
      }
    };

    checkServer();
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

  const createUploadSession = async (file: File): Promise<UploadSession> => {
    // Send only metadata to server (no file)
    const formData = new FormData();
    formData.append("title", title || "Untitled Video");
    formData.append("description", description || "");
    formData.append("tags", tags || "");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get authentication");
    }

    return await response.json();
  };

  const uploadToYouTube = async (
    file: File,
    session: UploadSession
  ): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      let lastProgressUpdate = startTime;

      console.log("Starting multipart upload to YouTube...");
      console.log("Upload URL:", session.uploadUrl);

      // Create multipart form data for YouTube API
      const formData = new FormData();

      // Add metadata as JSON blob
      const metadataBlob = new Blob([JSON.stringify(session.metadata)], {
        type: "application/json",
      });
      formData.append("metadata", metadataBlob);

      // Add video file
      formData.append("media", file);

      const xhr = new XMLHttpRequest();

      // Handle upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadPercentage(progress);

          const elapsed = (Date.now() - startTime) / 1000;
          setUploadProgress(
            `Uploading to YouTube... ${progress.toFixed(1)}% (${elapsed.toFixed(
              1
            )}s)`
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
        console.log("Upload response status:", xhr.status);
        console.log("Upload response:", xhr.responseText);

        if (xhr.status === 200) {
          try {
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
          } catch (parseError) {
            console.error("Failed to parse response:", parseError);
            reject(
              new Error(
                `Upload succeeded but failed to parse response: ${xhr.responseText}`
              )
            );
          }
        } else {
          console.error("Upload failed with status:", xhr.status);
          console.error("Response:", xhr.responseText);
          reject(
            new Error(`Upload failed: ${xhr.status} - ${xhr.responseText}`)
          );
        }
      });

      xhr.addEventListener("error", (error) => {
        console.error("Upload error:", error);
        reject(new Error("Upload failed"));
      });

      // Start the multipart upload
      xhr.open("POST", session.uploadUrl);
      xhr.setRequestHeader("Authorization", `Bearer ${session.accessToken}`);
      // Let the browser set the correct Content-Type with boundary for multipart
      xhr.send(formData);
    });
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setUploading(true);
    setError(null);
    setResult(null);
    setUploadProgress("Creating upload session...");
    setUploadSpeed("");
    setUploadPercentage(0);

    try {
      if (!isServerReady) {
        throw new Error("Server not ready");
      }

      setUploadProgress("Getting authentication from server...");
      setDebugInfo("Step 1: Getting authentication...");

      // Step 1: Get authentication from server (no file sent)
      const session = await createUploadSession(videoFile);

      setDebugInfo("Step 2: Uploading directly to YouTube...");
      setUploadProgress("Uploading directly to YouTube...");

      // Step 2: Upload directly to YouTube using server-provided credentials
      const result = await uploadToYouTube(videoFile, session);

      setResult(result);
      setUploadPercentage(100);
      setUploadProgress(
        `Upload completed in ${result.uploadTime.toFixed(2)} seconds`
      );
      setDebugInfo("Upload successful! Hybrid approach working perfectly.");

      console.log("Upload successful:", result);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed");
      setUploadProgress("Upload failed");
      setDebugInfo("Error: " + err.message);
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

  if (!isServerReady) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Video to YouTube</h1>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-600 mb-2">
            Checking server availability...
          </p>
          <p className="text-xs text-yellow-500">{debugInfo}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Video to YouTube</h1>

      {/* Hybrid Upload Info */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-medium text-green-800 mb-2">
          🚀 True Hybrid Upload System
        </h3>
        <p className="text-sm text-green-600 mb-2">
          ✓ Server provides authentication only
          <br />
          ✓ Client uploads directly to YouTube
          <br />
          ✓ No file size limits - file never touches server
          <br />✓ Secure - credentials stay on server
        </p>
        <p className="text-xs text-green-500">{debugInfo}</p>
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
            Any file size supported - true hybrid upload system
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
            <p className="text-xs text-green-600 mt-1">
              True hybrid upload: Server auth + Direct YouTube upload
            </p>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={!videoFile || uploading || !title.trim()}
            className={`flex-1 px-4 py-2 rounded font-medium ${
              !videoFile || uploading || !title.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload to YouTube"}
          </button>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <div className="mb-2">
              <div className="flex justify-between text-sm text-green-800 mb-1">
                <span>{uploadProgress}</span>
                <span>{uploadPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadPercentage}%` }}
                ></div>
              </div>
            </div>
            {uploadSpeed && (
              <p className="text-xs text-green-600 mt-1">{uploadSpeed}</p>
            )}
            <p className="text-xs text-green-600 mt-1">
              True hybrid upload: Server auth + Direct YouTube upload
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800 mb-2">
              <strong>Error:</strong> {error}
            </p>
            {error.includes("upload limit exceeded") && (
              <div className="text-xs text-red-700 bg-red-100 p-2 rounded mt-2">
                <strong>How to fix:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Wait until tomorrow (quotas reset daily)</li>
                  <li>Check your YouTube account for upload limits</li>
                  <li>Delete some test videos from YouTube Studio</li>
                  <li>Use a different YouTube account for testing</li>
                </ul>
              </div>
            )}
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
              Method: True hybrid upload (server auth + client upload)
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
