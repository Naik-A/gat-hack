import React, { useState, useEffect } from 'react';

function AnalyseImage() {
  const [analysisResult, setAnalysisResult] = useState('');

  useEffect(() => {
    // Fetch analysis result from the backend
    fetch('http://localhost:5000/api/analyse-image') // Replace with your actual backend URL
      .then((response) => response.json())
      .then((data) => {
        // Assuming the backend sends the analysis result in the "result" field
        setAnalysisResult(data.result);
      })
      .catch((error) => {
        console.error('Error fetching analysis result:', error);
        setAnalysisResult('Failed to fetch analysis result.');
      });
  }, []);

  return (
    <div>
      <h2>Analyse Image</h2>
      <textarea
        value={analysisResult || 'Fetching analysis...'}
        readOnly
        rows={10}
        cols={50}
      />
    </div>
  );
}

export default AnalyseImage;
