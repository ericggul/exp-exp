import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem 4rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
`;

export const Label = styled.div`
  font-size: 1.5rem;
  color: #eeeeee;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const Counter = styled.div`
  font-size: 10vw;
  color: ${(props) => props.color || "white"};
  font-weight: bold;
  transition: color 0.3s ease;
`;

export const PercentChange = styled.div`
  font-size: 2rem;
  color: ${(props) => props.color || "white"};
  margin-top: 0.5rem;
  font-weight: 500;
  transition: color 0.3s ease;
`;
