import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Copyright = styled.p`
  margin: 1rem 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <h3>AI 큐레이터</h3>
        <p>미술 작품 실시간 분석 서비스</p>
        <Copyright>
          © {new Date().getFullYear()} AI 큐레이터. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
