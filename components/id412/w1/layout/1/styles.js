import styled from "styled-components";
import { WholeContainer } from "styles/common";

// Main container
export const Container = styled.div`
  ${WholeContainer};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f7fa;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333;
`;

// Header section
export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
`;

// Device view toggle buttons
export const ViewToggle = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ViewButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${(props) => (props.active ? "#4361ee" : "#e9ecef")};
  color: ${(props) => (props.active ? "white" : "#495057")};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: ${(props) => (props.active ? "#3a56d4" : "#dee2e6")};
  }
`;

// Device frame container that simulates different device sizes
export const DeviceFrame = styled.div`
  width: ${(props) => {
    switch (props.viewType) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
      default:
        return "1200px";
    }
  }};
  height: ${(props) => (props.viewType === "mobile" ? "667px" : "600px")};
  border: ${(props) => (props.viewType === "mobile" ? "12px solid #333" : "1px solid #ddd")};
  border-radius: ${(props) => (props.viewType === "mobile" ? "36px" : "8px")};
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 2rem;
`;

export const DeviceContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// Navigation bar
export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #4361ee;
  color: white;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const NavItems = styled.ul`
  display: ${(props) => (props.viewType === "mobile" ? "none" : "flex")};
  list-style: none;
  gap: 2rem;
`;

export const NavItem = styled.li`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

// Main content area
export const MainContent = styled.main`
  flex: 1;
  padding: ${(props) => (props.viewType === "mobile" ? "1rem" : "2rem")};
`;

export const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;

export const HeroTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const HeroSubtitle = styled.p`
  color: #666;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => {
    switch (props.viewType) {
      case "mobile":
        return "1fr";
      case "tablet":
        return "repeat(2, 1fr)";
      case "desktop":
      default:
        return "repeat(4, 1fr)";
    }
  }};
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #4361ee;
`;

export const CardContent = styled.p`
  color: #666;
  line-height: 1.5;
`;

// Footer
export const Footer = styled.footer`
  padding: 1.5rem 2rem;
  background-color: #f8f9fa;
  text-align: center;
  color: #666;
  border-top: 1px solid #eee;
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
`;

// Code explanation area
export const CodeExplanation = styled.div`
  width: 100%;
  max-width: 800px;
  background: #f1f3f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
`;

export const CodeTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const CodeText = styled.p`
  line-height: 1.8;

  code {
    background-color: #e9ecef;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: "Fira Code", monospace;
    color: #e63946;
  }
`;
