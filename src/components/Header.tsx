import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import Container from "./Container";
import UrlForm from "./UrlForm";

const StyledHeader = styled.header(
  css({
    background: props =>
      `linear-gradient(to bottom right,
         ${props.colors.primary}, ${props.colors.accent}, ${props.colors.secondary})`,
    color: "white",
    textShadow: "1px 1px 10px #3333334f",
    pb: 3,
    py: 6,
  }),
);

const Title = styled.h1(
  css({
    mb: 3,
  }),
);

const SubTitle = styled.p(
  css({
    mb: 4,
    textShadow: "1px 1px 10px #333333a1",
  }),
);

const Header: React.FC = () => (
  <StyledHeader>
    <Container>
      <Title>Tag Tester</Title>
      <SubTitle>
        Test and edit your websites HTML, open graph, and twitter metadata tags
      </SubTitle>

      <UrlForm />
    </Container>
  </StyledHeader>
);

export default Header;
