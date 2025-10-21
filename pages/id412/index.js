import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #222;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eaeaea;
  font-weight: 600;
`;

const SectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const SectionItem = styled.li`
  border: 1px solid #e1e4e8;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #111;
  font-size: 1.5rem;
  border-left: 4px solid #0070f3;
  padding-left: 10px;
`;

const SectionDescription = styled.p`
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const SectionLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  background-color: #0070f3;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: inline-block;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0051b3;
    text-decoration: none;
  }
`;

const sections = [
  {
    title: "Basic",
    description: "Basic tutorials covering data, image, layout, mouse movement, time intervals, video, and word puzzles.",
    path: "/id412/w1",
  },
  {
    title: "APIs",
    description: "Examples of APIs.",
    path: "/id412/w2",
  },
  {
    title: "Three.js",
    description: "Three.js examples and tutorials for 3D visualization.",
    path: "/id412/w3",
  },

];

export default function CD3Index() {
  return (
    <Container>
      <Title>ID412 - KAIST XD Lab</Title>
      <SectionList>
        {sections.map((section) => (
          <SectionItem key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            <SectionDescription>{section.description}</SectionDescription>
            <SectionLink href={section.path}>View Section</SectionLink>
          </SectionItem>
        ))}
      </SectionList>
    </Container>
  );
}
