import axios from "axios";

// API 기본 설정
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 이미지 파일 업로드 및 분석
export const analyzeArtworkFile = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await API.post("/art/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Image analysis error:", error);
    throw error;
  }
};

// Base64 이미지 데이터로 분석
export const analyzeArtworkBase64 = async (imageData) => {
  try {
    const response = await API.post("/art/analyze-base64", { imageData });
    return response.data;
  } catch (error) {
    console.error("Image analysis error:", error);
    throw error;
  }
};

export default API;
