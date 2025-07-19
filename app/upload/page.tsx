"use client";
import { useState, useRef } from "react";

interface UploadResult {
  videoId: string;
  url: string;
  uploadTime: number;
  fileSize: number;
  uploadSpeed: string;
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
  const [useClientUpload, setUseClientUpload] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

      // Check if we need client-side upload for large files
      if (fileSizeInMB > 4) {
        setUseClientUpload(true);
        setError(
          `Large file detected (${fileSizeInMB.toFixed(
            2
          )} MB). Will use client-side upload to bypass Vercel limits.`
        );
      } else {
        setUseClientUpload(false);
        setError(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setUploading(true);
    setError(null);
    setResult(null);
    setUploadProgress("Starting upload...");
    setUploadSpeed("");
    setUploadPercentage(0);

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      const startTime = Date.now();
      let lastProgressUpdate = startTime;

      // Progress tracking with percentage
      progressIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const lastElapsed = (lastProgressUpdate - startTime) / 1000;

        // Estimate progress based on time (rough approximation)
        const estimatedProgress = Math.min(
          (elapsed / getEstimatedUploadTime(videoFile.size)) * 100,
          95
        );
        setUploadPercentage(estimatedProgress);

        setUploadProgress(`Uploading... (${elapsed.toFixed(1)}s elapsed)`);

        // Calculate upload speed every 5 seconds
        if (elapsed - lastElapsed >= 5) {
          const fileSizeInMB = videoFile.size / (1024 * 1024);
          const speed = fileSizeInMB / elapsed;
          setUploadSpeed(`Speed: ${speed.toFixed(2)} MB/s`);
          lastProgressUpdate = Date.now();
        }
      }, 1000);

      let res;

      if (useClientUpload) {
        // For large files, we'll need to implement client-side YouTube upload
        // This requires additional setup with YouTube API client library
        setError(
          "Client-side upload not yet implemented. Please use files under 4MB for now."
        );
        return;
      } else {
        // Standard server-side upload for smaller files
        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("title", title || "Untitled Video");
        formData.append("description", description || "");
        formData.append("tags", tags || "");

        // Set a longer timeout for large files
        const timeout = Math.max(300000, videoFile.size * 10); // At least 5 minutes
        console.log(`Setting client timeout to ${timeout / 1000} seconds`);

        res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          signal: abortControllerRef.current.signal,
        });
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || errorData.details || "Upload failed"
        );
      }

      const data: UploadResult = await res.json();
      setResult(data);
      setUploadPercentage(100);
      setUploadProgress(
        `Upload completed in ${data.uploadTime.toFixed(2)} seconds`
      );

      console.log("Upload successful:", data);
    } catch (err: any) {
      console.error("Upload error:", err);
      if (err.name === "AbortError") {
        setError("Upload was cancelled");
      } else if (err.message.includes("timeout")) {
        setError(
          "Upload timed out. Try with a smaller file or check your internet connection."
        );
      } else {
        setError(err.message || "Upload failed");
      }
      setUploadProgress("Upload failed");
    } finally {
      setUploading(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setUploading(false);
      setUploadProgress("Upload cancelled");
      setUploadPercentage(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const getEstimatedUploadTime = (fileSize: number) => {
    // Rough estimate: 1 MB per second (varies by connection)
    const estimatedSeconds = fileSize / (1024 * 1024);
    return Math.max(estimatedSeconds, 10); // Minimum 10 seconds
  };

  const getEstimatedTime = (fileSize: number) => {
    const estimatedSeconds = getEstimatedUploadTime(fileSize);
    if (estimatedSeconds < 60) {
      return `${Math.ceil(estimatedSeconds)} seconds`;
    } else {
      return `${Math.ceil(estimatedSeconds / 60)} minutes`;
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Video to YouTube</h1>

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
            Maximum file size: 4MB for server upload, larger files require
            client-side upload
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
            {useClientUpload && (
              <p className="text-xs text-blue-600 mt-1">
                ⚠️ Large file - will use client-side upload
              </p>
            )}
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
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload to YouTube"}
          </button>

          {uploading && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700"
            >
              Cancel
            </button>
          )}
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
              This may take several minutes for larger files. Please don't close
              this page.
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
