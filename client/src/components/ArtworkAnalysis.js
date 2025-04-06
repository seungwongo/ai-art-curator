import React, { useState } from "react";
import styled from "styled-components";
import {
  FaPaintBrush,
  FaHistory,
  FaBook,
  FaUserAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const AnalysisContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const ResultTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ArtistName = styled.h3`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  color: #0066cc;
  margin-right: 1rem;
  margin-top: 0.2rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const InfoValue = styled.p`
  color: #666;
  line-height: 1.5;
`;

const AnalysisSection = styled.div`
  margin-bottom: 2rem;
`;

const AnalysisSectionTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const AnalysisText = styled.p`
  line-height: 1.7;
  color: #444;
  white-space: pre-line;
`;

const TabContainer = styled.div`
  margin-top: 2rem;
`;

const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 4px;
  }
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: none;
  font-size: 1rem;
  white-space: nowrap;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  color: ${(props) => (props.$active ? "#0066cc" : "#333")};
  border-bottom: ${(props) => (props.$active ? "3px solid #0066cc" : "none")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #0066cc;
  }
`;

const TabContent = styled.div`
  display: ${(props) => (props.$active ? "block" : "none")};
`;

const ShareButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ArtworkAnalysis = ({ result }) => {
  const [activeTab, setActiveTab] = useState("analysis");

  // 결과 데이터가 없거나 구조가 다를 수 있으므로 안전하게 추출
  const {
    title = "알 수 없는 작품",
    artist = "알 수 없는 작가",
    period = "알 수 없음",
    style = "알 수 없음",
    technique = "알 수 없음",
    analysis = "",
    historical_context = "",
    other_works = [],
  } = result || {};

  // 공유하기 기능
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${title} by ${artist}`,
          text: `AI 큐레이터로 분석한 '${title}' 작품 정보입니다.`,
          url: window.location.href,
        })
        .then(() => {
          console.log("공유 성공");
        })
        .catch((error) => {
          console.log("공유 실패:", error);
        });
    } else {
      alert("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
    }
  };

  return (
    <AnalysisContainer>
      <ResultTitle>{title}</ResultTitle>
      <ArtistName>{artist}</ArtistName>

      <InfoGrid>
        <InfoCard>
          <InfoIcon>
            <FaUserAlt />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>작가</InfoLabel>
            <InfoValue>{artist}</InfoValue>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <InfoIcon>
            <FaCalendarAlt />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>제작 시기</InfoLabel>
            <InfoValue>{period}</InfoValue>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <InfoIcon>
            <FaPaintBrush />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>예술 양식</InfoLabel>
            <InfoValue>{style}</InfoValue>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <InfoIcon>
            <FaBook />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>기법 및 매체</InfoLabel>
            <InfoValue>{technique}</InfoValue>
          </InfoContent>
        </InfoCard>
      </InfoGrid>

      <TabContainer>
        <TabHeader>
          <Tab
            $active={activeTab === "analysis"}
            onClick={() => setActiveTab("analysis")}
          >
            작품 분석
          </Tab>
          <Tab
            $active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          >
            역사적 맥락
          </Tab>
          <Tab
            $active={activeTab === "other"}
            onClick={() => setActiveTab("other")}
          >
            작가의 다른 작품
          </Tab>
        </TabHeader>

        <TabContent $active={activeTab === "analysis"}>
          <AnalysisSection>
            <AnalysisText>{analysis}</AnalysisText>
          </AnalysisSection>
        </TabContent>

        <TabContent $active={activeTab === "history"}>
          <AnalysisSection>
            <AnalysisText>{historical_context}</AnalysisText>
          </AnalysisSection>
        </TabContent>

        <TabContent $active={activeTab === "other"}>
          <AnalysisSection>
            {Array.isArray(other_works) && other_works.length > 0 ? (
              <ul>
                {other_works.map((work, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    {work}
                  </li>
                ))}
              </ul>
            ) : (
              <AnalysisText>
                작가의 다른 작품 정보를 가져올 수 없습니다.
              </AnalysisText>
            )}
          </AnalysisSection>
        </TabContent>
      </TabContainer>

      <ShareButton onClick={handleShare}>공유하기</ShareButton>
    </AnalysisContainer>
  );
};

export default ArtworkAnalysis;
