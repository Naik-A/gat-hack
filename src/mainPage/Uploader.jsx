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
  const [captionInput, setCaptionInput] = useState(''); 

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
      console.log("Analysis Result:", result);
      setAnalysisResult(result);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGenerateCaptionGenre = async () => {
    try {
      setLoading(true);
      const context = { context: captionInput };
      
      // Send the caption input via POST and receive the generated result
      const result = await generateCaptionGenre(context);
      console.log("Caption & Genre Result:", result);
      
      // Set the result directly from the POST response
      setCaptionGenre(result);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Caption/Genre Error:", err);
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
              <textarea
                value={captionInput}
                onChange={(e) => setCaptionInput(e.target.value)} 
                placeholder="Enter your caption here..."
                rows={4}
                style={{ width: "100%", margin: "10px 0" }}
              />
              <button className="button" onClick={handleGenerateCaptionGenre} disabled={loading}>
                {loading ? "Generating..." : "Generate Caption & Genre"}
              </button>
              <button className="button delete-button" onClick={removeFile} disabled={loading}>
                Remove Image
              </button>
            </div>
          </div>
        )}
      </div>

      {analysisResult && (
        <div className="analysis-result">
          <h3>Image Analysis Result:</h3>
          <p>{analysisResult.image_description}</p>
          <p>{analysisResult.trackable}</p>
        </div>
      )}

      {captionGenre && (
        <div className="caption-genre-result">
          <h3>Generated Caption & Genre:</h3>
          <p>{captionGenre.Caption}</p>
          <p>Genre: {captionGenre.genre}</p>
        </div>
      )}
    </div>
  );
}

export default Uploader;
