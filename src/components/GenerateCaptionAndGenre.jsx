import React, { useState, useEffect } from 'react';

function GenerateCaptionAndGenre() {
  const [captionData, setCaptionData] = useState('');

  useEffect(() => {
    // Fetch generated caption and genre from the backend
    fetch('http://localhost:5000/api/generate-caption-genre') // Replace with your actual backend URL
      .then((response) => response.json())
      .then((data) => {
        // Assuming the backend sends the caption and genre in the "caption" and "genre" fields
        setCaptionData(`Caption: ${data.caption}\nGenre: ${data.genre}`);
      })
      .catch((error) => {
        console.error('Error fetching caption and genre:', error);
        setCaptionData('Failed to fetch caption and genre.');
      });
  }, []);

  return (
    <div>
      <h2>Generate Caption and Genre</h2>
      <textarea
        value={captionData || 'Fetching caption and genre...'}
        readOnly
        rows={10}
        cols={50}
      />
    </div>
  );
}

export default GenerateCaptionAndGenre;
