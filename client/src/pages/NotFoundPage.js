import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
`;

const Title = styled.h1`
  font-size: 8rem;
  margin-bottom: 1rem;
  color: #0066cc;

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const HomeButton = styled(Link)`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Title>404</Title>
      <SubTitle>페이지를 찾을 수 없습니다</SubTitle>
      <Message>
        요청하신 페이지가 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수
        없습니다.
      </Message>
      <HomeButton to="/">홈으로 돌아가기</HomeButton>
    </Container>
  );
};

export default NotFoundPage;
