import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Container from "./Container";
import UrlForm from "./UrlForm";

const StyledHeader = styled.header(
  css({
    background: props =>
      `linear-gradient(to bottom right, ${props.colors.primary}, ${props.colors.secondary})`,
    color: "white",
    mb: 3,
    py: 6,
    px: 3,
  }),
);

const Title = styled.h1(
  css({
    mb: 4,
  }),
);

const SubTitle = styled.p(
  css({
    mb: 4,
  }),
);

const Header: React.FC = () => (
  <StyledHeader>
    <Container>
      <Title>Open Graph Tester</Title>
      <SubTitle>
        Test your websites html, open graph and twitter metadata tags.
      </SubTitle>

      <UrlForm />
    </Container>
  </StyledHeader>
);

export default Header;
