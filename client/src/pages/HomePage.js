import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaCamera, FaImage, FaInfoCircle } from "react-icons/fa";

const HeroSection = styled.section`
  background: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%);
  color: white;
  text-align: center;
  padding: 4rem 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  background-color: ${(props) => (props.$primary ? "white" : "transparent")};
  color: ${(props) => (props.$primary ? "#6e8efb" : "white")};
  border: 2px solid white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 576px) {
    width: 80%;
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #6e8efb;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

const ExampleSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin: 3rem 0;
`;

const ExampleTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ExampleCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const ExampleImage = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  background-image: ${(props) =>
    props.$image ? `url(${props.$image})` : "none"};
  background-size: cover;
  background-position: center;
`;

const ExampleContent = styled.div`
  padding: 1rem;
`;

const ExampleName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ExampleInfo = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const HomePage = () => {
  // 여기에 예시 작품 데이터를 추가할 수 있습니다
  const exampleArtworks = [
    {
      id: 1,
      name: "별이 빛나는 밤",
      artist: "빈센트 반 고흐",
      year: "1889",
      style: "후기 인상주의",
      image: "https://via.placeholder.com/400x400?text=Starry+Night",
    },
    {
      id: 2,
      name: "모나리자",
      artist: "레오나르도 다 빈치",
      year: "1503-1506",
      style: "르네상스",
      image: "https://via.placeholder.com/400x400?text=Mona+Lisa",
    },
    {
      id: 3,
      name: "그림 (No. 5)",
      artist: "잭슨 폴록",
      year: "1948",
      style: "추상표현주의",
      image: "https://via.placeholder.com/400x400?text=No.5",
    },
  ];

  return (
    <>
      <HeroSection>
        <HeroTitle>AI 큐레이터로 미술 작품을 탐험하세요</HeroTitle>
        <HeroSubtitle>
          카메라로 작품을 비추면 AI가 실시간으로 작가 정보, 시대적 배경, 제작
          기법 등을 분석하여 안내해 드립니다.
        </HeroSubtitle>
        <ButtonContainer>
          <Button to="/analyze" $primary>
            <FaCamera /> 작품 분석하기
          </Button>
          <Button to="/about">
            <FaInfoCircle /> 서비스 소개
          </Button>
        </ButtonContainer>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureIcon>
            <FaCamera />
          </FeatureIcon>
          <FeatureTitle>실시간 작품 인식</FeatureTitle>
          <p>
            미술관에서 작품을 카메라로 비추면 즉시 인식하여 정보를 제공합니다.
          </p>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <FaImage />
          </FeatureIcon>
          <FeatureTitle>상세한 작품 분석</FeatureTitle>
          <p>
            작가 정보, 시대적 배경, 예술 사조, 제작 기법 등 다양한 정보를
            제공합니다.
          </p>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <FaInfoCircle />
          </FeatureIcon>
          <FeatureTitle>교육적 컨텐츠</FeatureTitle>
          <p>
            작품의 역사적 맥락과 예술적 의미를 쉽게 이해할 수 있도록 도와줍니다.
          </p>
        </FeatureCard>
      </FeaturesSection>

      <ExampleSection>
        <ExampleTitle>분석 예시</ExampleTitle>
        <ExampleGrid>
          {exampleArtworks.map((artwork) => (
            <ExampleCard key={artwork.id}>
              <ExampleImage $image={artwork.image} />
              <ExampleContent>
                <ExampleName>{artwork.name}</ExampleName>
                <ExampleInfo>
                  {artwork.artist}, {artwork.year}
                </ExampleInfo>
                <ExampleInfo>{artwork.style}</ExampleInfo>
              </ExampleContent>
            </ExampleCard>
          ))}
        </ExampleGrid>
      </ExampleSection>
    </>
  );
};

export default HomePage;
