import React from "react";
import styled, { keyframes } from "styled-components";
import { MobileContainer, MobileFlex, FlexCenterStyle } from "styles/common";

export default function TestMobileScreen() {
  return (
    <Container style={{ "--time": "0.9s", "--fs-title": "2rem", "--fs-body": "1rem" }}>
      <Header>
        <Brand>
          <BrandMark />
          <BrandText>LG</BrandText>
        </Brand>
        <ActionDot aria-hidden />
      </Header>

      <SearchArea role="search">
        <SearchIcon aria-hidden />
        <SearchInput placeholder="Search products, support, and more" inputMode="search" />
      </SearchArea>

      <PromoCard>
        <PromoTextGroup>
          <Kicker>Exclusive</Kicker>
          <PromoTitle>ThinQ Experience</PromoTitle>
          <PromoSubtitle>Smarter living across your LG ecosystem</PromoSubtitle>
        </PromoTextGroup>
        <PromoBadge>New</PromoBadge>
      </PromoCard>

      <Chips role="tablist" aria-label="Categories">
        {["TV & AV", "Home Appliances", "Monitors", "Laptops", "Audio", "Air Care", "Kitchen"].map((label) => (
          <Chip key={label} role="tab" tabIndex={0}>
            {label}
          </Chip>
        ))}
      </Chips>

      <SectionHeading>Recommended for you</SectionHeading>
      <Cards>
        {[
          { title: "OLED evo C4 65”", subtitle: "4K Smart TV with ThinQ AI", price: "From $1,499" },
          { title: "Gram 16 (2025)", subtitle: "Ultra-light, all‑day battery", price: "From $1,199" },
          { title: "TONE Free Fit", subtitle: "Adaptive ANC earbuds", price: "From $129" },
        ].map((item, idx) => (
          <Card key={item.title} style={{ "--delay": `${idx * 0.08}s` }}>
            <CardMedia aria-hidden />
            <CardText>
              <CardTitle>{item.title}</CardTitle>
              <CardSubtitle>{item.subtitle}</CardSubtitle>
              <CardPrice>{item.price}</CardPrice>
            </CardText>
          </Card>
        ))}
      </Cards>

      <SectionHeading>Support & Services</SectionHeading>
      <Services>
        {[
          { title: "Register product" },
          { title: "Book a repair" },
          { title: "Warranty info" },
          { title: "User guides" },
        ].map((svc, idx) => (
          <Service key={svc.title} style={{ "--delay": `${idx * 0.06}s` }}>
            <ServiceIcon aria-hidden />
            <ServiceTitle>{svc.title}</ServiceTitle>
          </Service>
        ))}
      </Services>

      <BottomSpacer />
      <BottomNav role="navigation" aria-label="Primary">
        <PrimaryButton>Shop deals</PrimaryButton>
        <SecondaryButton>Support</SecondaryButton>
      </BottomNav>
    </Container>
  );
}

const appear = keyframes`
  from { opacity: 0; transform: translate3d(0, .5rem, 0) scale(.99); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
`;

const Container = styled.div`
  ${MobileContainer};
  ${MobileFlex};
  gap: 1.2rem;
  background: linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 98%) 100%);
  color: hsl(0 0% 10%);
  -webkit-font-smoothing: antialiased;
  padding: 1.2rem 1rem 0;
  box-sizing: border-box;
`;

const Header = styled.header`
  ${FlexCenterStyle};
  justify-content: space-between;
  width: 100%;
  padding: 0.4rem 0.2rem;
  animation: ${appear} var(--time, 1s) ease both;
`;

const Brand = styled.div`
  ${FlexCenterStyle};
  gap: 0.6rem;
`;

const BrandMark = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999rem;
  background: radial-gradient(circle at 30% 30%, hsl(344 85% 55%), hsl(344 85% 45%));
  box-shadow: 0 0 0.6rem hsl(344 85% 70% / 0.25);
`;

const BrandText = styled.span`
  font-weight: 700;
  letter-spacing: 0.02em;
  font-size: var(--fs-title, 1.25rem);
`;

const ActionDot = styled.button`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999rem;
  background: currentColor;
  opacity: 0.6;
  border: none;
`;

const SearchArea = styled.label`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1.25rem 1fr;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: 999rem;
  background: hsl(0 0% 96%);
  box-shadow: inset 0 0 0 0.06rem hsl(0 0% 0% / 0.04);
  animation: ${appear} var(--time, 1s) ease both;
  animation-delay: 0.02s;
`;

const SearchIcon = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999rem;
  background:
    radial-gradient(circle at 45% 45%, hsl(0 0% 30%) 25%, hsl(0 0% 30% / 0) 26%),
    linear-gradient(90deg, hsl(0 0% 30%) 0 35%, transparent 35% 100%);
  transform: rotate(45deg);
  opacity: 0.6;
`;

const SearchInput = styled.input.attrs({ type: "search" })`
  width: 100%;
  font-size: var(--fs-body, 1rem);
  line-height: 1.2;
  background: transparent;
  color: inherit;
  border: none;
  outline: none;
  ::placeholder { color: hsl(0 0% 40%); }
`;

const PromoCard = styled.section`
  position: relative;
  width: 100%;
  border-radius: 1.2rem;
  padding: 1.4rem 1.2rem;
  background:
    radial-gradient(80% 120% at 10% 20%, hsl(344 85% 65% / 0.35), transparent),
    linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 97%) 100%);
  box-shadow:
    0 0.4rem 1.2rem hsl(0 0% 0% / 0.06),
    inset 0 0 0 0.06rem hsl(0 0% 0% / 0.04);
  overflow: hidden;
  animation: ${appear} var(--time, 1s) ease both;
  animation-delay: 0.05s;
`;

const PromoTextGroup = styled.div`
  display: grid;
  gap: 0.3rem;
`;

const Kicker = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: hsl(344 85% 40%);
  font-weight: 700;
`;

const PromoTitle = styled.h2`
  font-size: calc(var(--fs-title, 1.25rem) * 1.2);
  line-height: 1.1;
  font-weight: 800;
`;

const PromoSubtitle = styled.p`
  font-size: var(--fs-body, 1rem);
  color: hsl(0 0% 32%);
`;

const PromoBadge = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 999rem;
  background: hsl(344 85% 55%);
  color: white;
  font-weight: 700;
`;

const Chips = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 0.6rem;
  width: 100%;
  overflow-x: auto;
  padding: 0.2rem 0.1rem;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  animation: ${appear} var(--time, 1s) ease both;
  animation-delay: 0.08s;
`;

const Chip = styled.button`
  padding: 0.6rem 0.9rem;
  border-radius: 999rem;
  border: none;
  background: hsl(0 0% 94%);
  color: hsl(0 0% 15%);
  font-size: 0.95rem;
  white-space: nowrap;
  font-weight: 600;
`;

const SectionHeading = styled.h3`
  width: 100%;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  padding: 0.4rem 0.2rem 0;
  color: hsl(0 0% 16%);
`;

const Cards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
`;

const Card = styled.article`
  width: 100%;
  border-radius: 1rem;
  background: white;
  overflow: hidden;
  box-shadow:
    0 0.35rem 1rem hsl(0 0% 0% / 0.06),
    inset 0 0 0 0.06rem hsl(0 0% 0% / 0.04);
  animation: ${appear} var(--time, 1s) ease both;
  animation-delay: var(--delay, 0s);
`;

const CardMedia = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background:
    linear-gradient(180deg, hsl(0 0% 98%), hsl(0 0% 96%)),
    radial-gradient(80% 120% at 30% 20%, hsl(344 85% 65% / 0.25), transparent);
`;

const CardText = styled.div`
  display: grid;
  gap: 0.2rem;
  padding: 0.9rem 1rem 1.1rem;
`;

const CardTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: 800;
`;

const CardSubtitle = styled.p`
  font-size: 0.95rem;
  color: hsl(0 0% 36%);
`;

const CardPrice = styled.p`
  font-size: 0.95rem;
  font-weight: 700;
  color: hsl(0 0% 20%);
`;

const Services = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  width: 100%;
`;

const Service = styled.button`
  ${FlexCenterStyle};
  gap: 0.6rem;
  padding: 1rem;
  border-radius: 1rem;
  background: hsl(0 0% 96%);
  border: none;
  text-align: left;
  flex-direction: row;
  animation: ${appear} var(--time, 1s) ease both;
  animation-delay: var(--delay, 0s);
`;

const ServiceIcon = styled.span`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 0.3rem;
  background: linear-gradient(135deg, hsl(0 0% 40%), hsl(0 0% 20%));
  opacity: 0.8;
`;

const ServiceTitle = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
`;

const BottomSpacer = styled.div`
  height: 5.2rem;
`;

const BottomNav = styled.nav`
  position: sticky;
  bottom: 0;
  width: calc(100% + 2rem);
  margin-left: -1rem;
  padding: 0.8rem 1rem 1rem;
  background: linear-gradient(180deg, transparent, hsl(0 0% 98%) 20%, hsl(0 0% 98%) 100%);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  box-sizing: border-box;
  backdrop-filter: blur(0.6rem);
`;

const PrimaryButton = styled.button`
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  border: none;
  background: hsl(344 85% 55%);
  color: white;
  font-weight: 800;
  font-size: 1rem;
`;

const SecondaryButton = styled.button`
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  border: none;
  background: hsl(0 0% 12%);
  color: white;
  font-weight: 800;
  font-size: 1rem;
`;


