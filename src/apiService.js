// src/apiService.js
const API_BASE_URL = "http://localhost:8000"; // Update if your backend runs elsewhere

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to upload image");
  }

  return response.json();
};

export const analyzeImage = async () => {
  const response = await fetch(`${API_BASE_URL}/analyze-image`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to analyze image");
  }

  return response.json();
};

export const generateCaptionGenre = async (context) => {
  const response = await fetch(`${API_BASE_URL}/generate-caption-genre`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ context }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to generate caption and genre");
  }

  return response.json();
};

export const deleteImages = async () => {
  const response = await fetch(`${API_BASE_URL}/delete-images`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to delete images");
  }

  return response.json();
};
