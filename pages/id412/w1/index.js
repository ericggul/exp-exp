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

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #0070f3 #f0f0f0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0070f3;
    border-radius: 10px;
  }
`;

const CategoryListItem = styled.li`
  margin-bottom: 1.5rem;
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

const CategoryTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #111;
  font-size: 1.5rem;
  border-left: 4px solid #0070f3;
  padding-left: 10px;
`;

const TutorialList = styled.ul`
  list-style: none;
  padding-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TutorialListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const TutorialLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 0.9rem;
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

// Updated categories with accurate counts
const categories = [
  { name: "Data", nameLower: "data", count: 3 },
  { name: "Image", nameLower: "image", count: 5 },
  { name: "Layout", nameLower: "layout", count: 1 },
  { name: "Mouse Move", nameLower: "mouse-move", count: 4 },
  { name: "Time Interval", nameLower: "time-interval", count: 2 },
  { name: "Video", nameLower: "video", count: 4 },
  { name: "Word Puzzle", nameLower: "word-puzzle", count: 2 },
];

export default function BasicIndex() {
  return (
    <Container>
      <Title>Basic Tutorials</Title>
      <CategoryList>
        {categories.map((category) => (
          <CategoryListItem key={category.name}>
            <CategoryTitle>{category.name}</CategoryTitle>
            <TutorialList>
              {/* Generate links from 1 to count */}
              {Array.from({ length: category.count }, (_, i) => i + 1).map((tutorialNum) => (
                <TutorialListItem key={`${category.nameLower}-${tutorialNum}`}>
                  <TutorialLink href={`/id412/w1/${category.nameLower}/${tutorialNum}`} target="_blank" rel="noopener noreferrer">
                    Tutorial {tutorialNum}
                  </TutorialLink>
                </TutorialListItem>
              ))}
            </TutorialList>
          </CategoryListItem>
        ))}
      </CategoryList>
    </Container>
  );
}
