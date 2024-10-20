import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${API_BASE_URL}/upload-image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const analyzeImage = async () => {
    const response = await axios.get(`${API_BASE_URL}/analyze-image`);
    return response.data;
};

export const generateCaptionGenre = async (context) => {
    const response = await axios.post(`${API_BASE_URL}/generate-caption-genre`, context, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const deleteImages = async () => {
    const response = await axios.delete(`${API_BASE_URL}/delete-images`);
    return response.data;
};
