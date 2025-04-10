import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #111827;
`;

export const Title = styled.h1`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 32px;
  margin: 0;
  font-weight: 700;
  z-index: 10;
  text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
`;

export const Subtitle = styled.p`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  text-align: center;
  color: #e0e0e0;
  font-size: 16px;
  margin: 0;
  z-index: 10;
`;

export const ItemDescription = styled.div`
  background-color: rgba(17, 24, 39, 0.9);
  border: 1px solid rgba(99, 102, 241, 0.5);
  border-radius: 8px;
  padding: 12px;
  width: 220px;
  text-align: center;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  transform-origin: center top;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ItemTitle = styled.h3`
  color: #6366f1;
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

export const ItemText = styled.p`
  color: white;
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`;
