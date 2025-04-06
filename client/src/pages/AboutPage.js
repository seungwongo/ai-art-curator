import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRobot, FaPalette, FaUniversity, FaCamera } from "react-icons/fa";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const AboutSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const SectionContent = styled.div`
  line-height: 1.7;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const FeatureCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #0066cc;
  margin-right: 1rem;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const CTA = styled.div`
  text-align: center;
  margin: 3rem 0 1rem;
`;

const CTAButton = styled(Link)`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }

  svg {
    margin-right: 8px;
  }
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <PageTitle>AI 큐레이터 소개</PageTitle>

      <AboutSection>
        <SectionTitle>서비스 소개</SectionTitle>
        <SectionContent>
          <p>
            AI 큐레이터는 미술관에서 전시된 작품을 카메라로 비추면 작품의 작가
            정보, 시대적 배경, 제작 기법 등을 실시간으로 분석해 설명해 주는
            서비스입니다.
          </p>
          <p>
            OpenAI의 GPT 비전 모델을 활용하여 미술 작품에 대한 정확하고 풍부한
            정보를 제공합니다. 더 이상 전시회에서 작품 정보를 찾기 위해 고민하지
            마세요. AI 큐레이터가 당신의 개인 도슨트가 되어드립니다.
          </p>
        </SectionContent>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaRobot />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>AI 기술</FeatureTitle>
              <FeatureDescription>
                최신 인공지능 비전 기술을 활용하여 미술 작품을 정확하게 인식하고
                분석합니다.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaPalette />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>예술 전문성</FeatureTitle>
              <FeatureDescription>
                다양한 예술 사조와 작품에 대한 깊이 있는 이해를 바탕으로 풍부한
                정보를 제공합니다.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaCamera />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>간편한 사용</FeatureTitle>
              <FeatureDescription>
                카메라로 작품을 비추거나 저장된 이미지를 업로드하기만 하면 바로
                분석이 시작됩니다.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaUniversity />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>교육적 가치</FeatureTitle>
              <FeatureDescription>
                누구나 쉽게 미술 작품에 대한 이해를 높이고 예술 감상의 깊이를
                더할 수 있습니다.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>
        </FeatureGrid>
      </AboutSection>

      <AboutSection>
        <SectionTitle>사용 방법</SectionTitle>
        <SectionContent>
          <ol>
            <li>
              <strong>작품 분석 페이지로 이동:</strong> 메인 페이지에서 '작품
              분석하기' 버튼을 클릭하거나 상단 메뉴에서 '작품 분석'을
              선택하세요.
            </li>
            <li>
              <strong>카메라 또는 이미지 업로드 선택:</strong> 카메라를 사용하여
              실시간으로 작품을 촬영하거나, 이미 저장된 작품 이미지를 업로드할
              수 있습니다.
            </li>
            <li>
              <strong>작품 분석 시작:</strong> 이미지가 준비되면 '작품 분석하기'
              버튼을 클릭하세요. AI가 작품을 분석하는 동안 잠시 기다려주세요.
            </li>
            <li>
              <strong>분석 결과 확인:</strong> 작품의 제목, 작가, 제작 시기,
              예술 양식, 기법 등 다양한 정보를 확인할 수 있습니다. 탭을 통해
              작품 분석, 역사적 맥락, 작가의 다른 작품 등 더 자세한 정보도
              살펴보세요.
            </li>
            <li>
              <strong>분석 결과 공유:</strong> 원하는 경우 분석 결과를 다른
              사람들과 공유할 수 있습니다.
            </li>
          </ol>
        </SectionContent>
      </AboutSection>

      <CTA>
        <CTAButton to="/analyze">
          <FaCamera /> 지금 작품 분석하기
        </CTAButton>
      </CTA>
    </PageContainer>
  );
};

export default AboutPage;
