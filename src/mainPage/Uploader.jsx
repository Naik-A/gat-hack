// src/mainPage/Uploader.jsx
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../uploader.css";
import { uploadImage, analyzeImage, generateCaptionGenre, deleteImages } from "../apiService";

function Uploader() {
  const [files, setFiles] = useState([]);
  const [isBoxVisible, setBoxVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [captionGenre, setCaptionGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      await uploadImage(file);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setFiles([newFile]);
      setBoxVisible(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }, []);

  const removeFile = async () => {
    try {
      await deleteImages();
      setFiles([]);
      setBoxVisible(true);
      setAnalysisResult(null);
      setCaptionGenre(null);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const result = await analyzeImage();
      setAnalysisResult(result);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGenerateCaptionGenre = async () => {
    try {
      setLoading(true);
      const context = "Describe the image and determine its genre.";
      const result = await generateCaptionGenre(context);
      setCaptionGenre(result);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <div className="Uploader">
      <h2 className="uploader-heading">Add Your Image</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="upload-container">
        {isBoxVisible && (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>{isDragActive ? "Drop your image here..." : "Drag & drop an image here, or click to select one"}</p>
          </div>
        )}
        {files.length > 0 && (
          <div className="image-container">
            <img
              src={files[currentIndex].preview}
              alt={`Preview ${currentIndex}`}
              className="image-preview"
            />
            <div className="button-group">
            <button className="button" onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Image"}
            </button>
            <button className="button" onClick={handleGenerateCaptionGenre} disabled={loading}>
              {loading ? "Generating..." : "Generate Caption & Genre"}
            </button>
            <button className="button delete-button" onClick={removeFile}>
              &times; Delete Image
            </button>
          </div>
            <div className="result-section">
              {analysisResult && (
                <>
                  <h3>Analysis Result:</h3>
                  <p>Objects Detected: {analysisResult.objects_detected.join(", ")}</p>
                  <p>Image Quality: {analysisResult.image_quality}</p>
                  <p>Notes: {analysisResult.notes}</p>
                </>
              )}
              {captionGenre && (
                <>
                  <h3>Caption & Genre:</h3>
                  <p>Caption: {captionGenre.caption}</p>
                  <p>Genre: {captionGenre.genre}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Uploader;
