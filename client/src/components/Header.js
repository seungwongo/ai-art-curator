import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.nav`
  display: flex;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${(props) => (props.$isOpen ? "0" : "-100%")};
    width: 60%;
    height: 100vh;
    background-color: #fff;
    flex-direction: column;
    padding: 2rem;
    transition: right 0.3s ease-in-out;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  margin-left: 2rem;
  color: ${(props) => (props.$active ? "#0066cc" : "#333")};
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  text-decoration: none;

  &:hover {
    color: #0066cc;
  }

  @media (max-width: 768px) {
    margin: 1.5rem 0;
    font-size: 1.2rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    z-index: 1001;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">AI 큐레이터</Logo>

        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <NavLinks $isOpen={isMenuOpen}>
          <NavLink
            to="/"
            $active={location.pathname === "/"}
            onClick={closeMenu}
          >
            홈
          </NavLink>
          <NavLink
            to="/analyze"
            $active={location.pathname === "/analyze"}
            onClick={closeMenu}
          >
            작품 분석
          </NavLink>
          <NavLink
            to="/about"
            $active={location.pathname === "/about"}
            onClick={closeMenu}
          >
            소개
          </NavLink>
        </NavLinks>

        <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
