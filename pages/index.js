import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #222;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
`;

const CourseCard = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CourseHeader = styled.div`
  background-color: #0070f3;
  color: white;
  padding: 1.5rem;
  text-align: center;
`;

const CourseTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

const CourseBody = styled.div`
  padding: 1.5rem;
`;

const CourseDescription = styled.p`
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  height: 4.8rem;
  overflow: hidden;
`;

const CourseLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  background-color: #0070f3;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: block;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0051b3;
    text-decoration: none;
  }
`;

const courses = [
  {
    id: "cd3",
    title: "CD3",
    description: "Interactive data visualization with D3.js and Three.js.",
    color: "#0070f3",
  },
  {
    id: "cd4",
    title: "CD4",
    description: "Advanced visualization techniques with weekly exercises.",
    color: "#ff0080",
  },
  {
    id: "id412",
    title: "ID412",
    description: "Interface design principles and weekly assignments.",
    color: "#7928ca",
  },
  {
    id: "id430",
    title: "ID430",
    description: "Device interaction for single and multiple devices.",
    color: "#00b894",
  },
];

export default function HomePage() {
  return (
    <Container>
      <Header>
        <Title>Interactive Tutorials</Title>
        <Subtitle>Explore various tutorials and examples for data visualization, interface design, and device interaction</Subtitle>
      </Header>

      <CourseGrid>
        {courses.map((course) => (
          <CourseCard key={course.id}>
            <CourseHeader style={{ backgroundColor: course.color }}>
              <CourseTitle>{course.title}</CourseTitle>
            </CourseHeader>
            <CourseBody>
              <CourseDescription>{course.description}</CourseDescription>
              <CourseLink href={`/${course.id}`}>View Course</CourseLink>
            </CourseBody>
          </CourseCard>
        ))}
      </CourseGrid>
    </Container>
  );
}
