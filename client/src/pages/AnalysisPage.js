import React, { useState, useRef } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import { FaCamera, FaUpload, FaSpinner } from "react-icons/fa";
import ArtworkAnalysis from "../components/ArtworkAnalysis";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: none;
  font-size: 1.1rem;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  color: ${(props) => (props.$active ? "#0066cc" : "#333")};
  border-bottom: ${(props) => (props.$active ? "3px solid #0066cc" : "none")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #0066cc;
  }
`;

const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const WebcamContainer = styled.div`
  width: 100%;
  max-width: 640px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const StyledWebcam = styled(Webcam)`
  width: 100%;
  height: auto;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#0066cc" : "#f8f9fa")};
  color: ${(props) => (props.$primary ? "white" : "#333")};
  border: 1px solid ${(props) => (props.$primary ? "#0066cc" : "#ddd")};
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$primary ? "#0056b3" : "#e9ecef")};
  }

  &:disabled {
    background-color: #e9ecef;
    color: #868e96;
    cursor: not-allowed;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const UploadBox = styled.div`
  width: 100%;
  max-width: 640px;
  height: 300px;
  border: 2px dashed #ddd;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    border-color: #0066cc;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #0066cc;
  margin-bottom: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingSpinner = styled(FaSpinner)`
  font-size: 3rem;
  color: white;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState("camera");
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCapturedImage(null);
    setUploadedImage(null);
    setAnalysisResult(null);
    setError(null);
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const clearUpload = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    fileInputRef.current.value = "";
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const imageData = activeTab === "camera" ? capturedImage : uploadedImage;

      const response = await axios.post("/api/art/analyze-base64", {
        imageData,
      });

      if (response.data.success) {
        setAnalysisResult(response.data.data);
      } else {
        setError(
          response.data.message || "이미지 분석 중 오류가 발생했습니다."
        );
      }
    } catch (err) {
      console.error("Analysis Error:", err);
      setError("이미지 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle>작품 분석</PageTitle>

      <TabsContainer>
        <Tab
          $active={activeTab === "camera"}
          onClick={() => handleTabChange("camera")}
        >
          카메라
        </Tab>
        <Tab
          $active={activeTab === "upload"}
          onClick={() => handleTabChange("upload")}
        >
          이미지 업로드
        </Tab>
      </TabsContainer>

      {activeTab === "camera" && (
        <CameraContainer>
          {!capturedImage ? (
            <>
              <WebcamContainer>
                <StyledWebcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "environment" }}
                />
              </WebcamContainer>
              <Button $primary onClick={captureImage}>
                <FaCamera /> 사진 촬영
              </Button>
            </>
          ) : (
            <>
              <PreviewImage src={capturedImage} alt="캡처된 이미지" />
              <ButtonGroup>
                <Button onClick={retakeImage}>다시 촬영</Button>
                <Button $primary onClick={analyzeImage} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <FaSpinner />
                  ) : (
                    <>
                      <FaCamera /> 작품 분석하기
                    </>
                  )}
                </Button>
              </ButtonGroup>
            </>
          )}
        </CameraContainer>
      )}

      {activeTab === "upload" && (
        <UploadContainer>
          {!uploadedImage ? (
            <>
              <UploadBox onClick={handleUploadClick}>
                <UploadIcon>
                  <FaUpload />
                </UploadIcon>
                <h3>이미지를 업로드하세요</h3>
                <p>JPG, PNG, GIF 파일 지원 (최대 10MB)</p>
                <FileInput
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  onChange={handleFileUpload}
                />
              </UploadBox>
            </>
          ) : (
            <>
              <PreviewImage src={uploadedImage} alt="업로드된 이미지" />
              <ButtonGroup>
                <Button onClick={clearUpload}>다시 업로드</Button>
                <Button $primary onClick={analyzeImage} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <FaSpinner />
                  ) : (
                    <>
                      <FaCamera /> 작품 분석하기
                    </>
                  )}
                </Button>
              </ButtonGroup>
            </>
          )}
        </UploadContainer>
      )}

      {error && (
        <div style={{ color: "red", textAlign: "center", margin: "1rem 0" }}>
          <p>{error}</p>
        </div>
      )}

      {analysisResult && <ArtworkAnalysis result={analysisResult} />}

      {isAnalyzing && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
    </PageContainer>
  );
};

export default AnalysisPage;
