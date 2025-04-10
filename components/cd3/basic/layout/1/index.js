import React, { useState } from "react";
import * as S from "./styles";

export default function ResponsiveLayout() {
  const [activeView, setActiveView] = useState("desktop");

  // Sample content sections for a basic webpage
  const contentSections = [
    { id: 1, title: "Welcome", content: "This is a responsive layout example for designers." },
    { id: 2, title: "Features", content: "Demonstrates how styled-components can be used to create responsive designs." },
    { id: 3, title: "Gallery", content: "Your images would go here, arranged based on screen size." },
    { id: 4, title: "Contact", content: "Your contact form would be here, adapting to different devices." },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>Responsive Design Example</S.Title>
        <S.ViewToggle>
          <S.ViewButton active={activeView === "mobile"} onClick={() => setActiveView("mobile")}>
            Mobile
          </S.ViewButton>
          <S.ViewButton active={activeView === "tablet"} onClick={() => setActiveView("tablet")}>
            Tablet
          </S.ViewButton>
          <S.ViewButton active={activeView === "desktop"} onClick={() => setActiveView("desktop")}>
            Desktop
          </S.ViewButton>
        </S.ViewToggle>
      </S.Header>

      <S.DeviceFrame viewType={activeView}>
        <S.DeviceContent>
          <S.Navigation>
            <S.Logo>Brand</S.Logo>
            <S.NavItems viewType={activeView}>
              <S.NavItem>Home</S.NavItem>
              <S.NavItem>About</S.NavItem>
              <S.NavItem>Services</S.NavItem>
              <S.NavItem>Contact</S.NavItem>
            </S.NavItems>
            {activeView === "mobile" && <S.MobileMenuButton>☰</S.MobileMenuButton>}
          </S.Navigation>

          <S.MainContent viewType={activeView}>
            <S.HeroSection>
              <S.HeroTitle>Responsive Web Design</S.HeroTitle>
              <S.HeroSubtitle>Learning how layouts adapt across different screen sizes</S.HeroSubtitle>
            </S.HeroSection>

            <S.ContentGrid viewType={activeView}>
              {contentSections.map((section) => (
                <S.Card key={section.id}>
                  <S.CardTitle>{section.title}</S.CardTitle>
                  <S.CardContent>{section.content}</S.CardContent>
                </S.Card>
              ))}
            </S.ContentGrid>
          </S.MainContent>

          <S.Footer>
            <S.FooterText>This is a responsive layout demo for design students</S.FooterText>
          </S.Footer>
        </S.DeviceContent>
      </S.DeviceFrame>

      <S.CodeExplanation>
        <S.CodeTitle>What's happening here?</S.CodeTitle>
        <S.CodeText>
          • This example uses <code>styled-components</code> to create a responsive layout
          <br />
          • The layout adapts based on the selected device view
          <br />
          • In real websites, media queries would be used instead of manual toggles
          <br />• Key techniques: Flexbox, Grid, and conditional styling
        </S.CodeText>
      </S.CodeExplanation>
    </S.Container>
  );
}
