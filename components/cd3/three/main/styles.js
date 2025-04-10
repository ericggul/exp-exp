import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fafafa;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  overflow-y: auto;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: #222;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eaeaea;
  font-weight: 600;
  width: 100%;
`;

export const CategoryTitle = styled.h2`
  background: #0070f3;
  color: #fff;
  padding: 15px 20px;
  margin: 0;
  font-size: 1.5em;
  font-weight: 500;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const Comp = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  margin-bottom: 40px !important;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  a {
    display: block;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    color: #0070f3;
    text-decoration: none;
    font-size: 1.1em;
    border-bottom: 1px solid #eee;
    transition: background 0.3s, padding-left 0.3s;

    &:hover {
      background: #f1f1f1;
      padding-left: 30px;
    }
  }

  &:last-child a {
    border-bottom: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
