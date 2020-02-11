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
    textShadow: "1px 1px 10px #333333a1",

    a: {
      color: "white",

      "&:hover": {
        color: "white",
      },
    },
  }),
);

const Split = styled.div(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
);

const Footer: React.FC = () => (
  <StyledFooter>
    <Container>
      <Split>
        <p>
          Made with ♥ by{" "}
          <a href="https://jakerunzer.com" target="_blank" rel="noopener">
            jake runzer
          </a>
        </p>
        <p>
          <a
            href="https://github.com/coffee-cup/tag-tester"
            target="_blank"
            rel="noopener"
          >
            Source on Github
          </a>
        </p>
      </Split>
    </Container>
  </StyledFooter>
);

export default Footer;
