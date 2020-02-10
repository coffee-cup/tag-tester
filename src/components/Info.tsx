import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";

const StyledInfo = styled.div(
  css({
    px: [0, 0, 4],
    pb: [0, 0, 4],
    pt: 4,
  }),
);

const UrlContainer = styled.div(
  css({
    bg: "secondary",
    p: 2,
    fontSize: 1,
    transition: "all 250ms ease-in-out",

    a: {
      color: "black",
    },

    "&:hover": {
      bg: "primary",
      a: {
        bg: "transparent",
        color: "white",
      },
    },
  }),
);

const DebuggerContainer = styled.ul(css({}));

const DebuggerLink = styled.a(css({}));

const DebuggerLinks = () => (
  <DebuggerContainer>
    <li>
      <DebuggerLink
        href="https://cards-dev.twitter.com/validator"
        target="_blank"
        rel="noopenerkj"
      >
        Twitter card validator
      </DebuggerLink>
    </li>
    <li>
      <DebuggerLink
        href="https://developers.facebook.com/tools/debug/"
        target="_blank"
        rel="noopenerkj"
      >
        Faccebook debugger
      </DebuggerLink>
    </li>
    <li>
      <DebuggerLink
        href="https://www.linkedin.com/post-inspector/inspect/"
        target="_blank"
        rel="noopenerkj"
      >
        LinkedIn inspector
      </DebuggerLink>
    </li>
  </DebuggerContainer>
);

export const Info = () => {
  const { results } = useOG();

  if (results.type !== "success") {
    return null;
  }

  return (
    <StyledInfo>
      <h3>Testing</h3>

      <p>Use this url</p>

      <UrlContainer>
        <a href={results.customUrl}>{results.customUrl}</a>
      </UrlContainer>

      <p>
        on the following sites to check what it will look like when shared on
        social
      </p>

      <DebuggerLinks />

      <h3>Help</h3>

      <ul>
        <li>
          <a href="https://www.wordstream.com/meta-tags">
            What are metadata tags
          </a>
        </li>
        <li>
          <a href="/about">What is this site</a>
        </li>
      </ul>
    </StyledInfo>
  );
};

export default Info;
