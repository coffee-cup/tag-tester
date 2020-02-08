import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Container from "./Container";

const StyledFooter = styled.footer(
  css({
    background: props =>
      `linear-gradient(to bottom right, ${props.colors.primary}, ${props.colors.secondary})`,
    color: "white",
    pb: 3,
    py: 3,
  }),
);

const Footer: React.FC = () => (
  <StyledFooter>
    <Container>
      <p>Made with ♥</p>
    </Container>
  </StyledFooter>
);

export default Footer;
