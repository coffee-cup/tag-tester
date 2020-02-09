import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";

const StyledCustomUrl = styled.div(
  css({
    py: 4,
  }),
);

const DebuggerContainer = styled.div(css({}));

const DebuggerLink = styled.a(
  css({
    display: "inline-block",
    pr: 3,
  }),
);

const DebuggerLinks = () => (
  <DebuggerContainer>
    <DebuggerLink
      href="https://cards-dev.twitter.com/validator"
      target="_blank"
      rel="noopenerkj"
    >
      Check Twitter
    </DebuggerLink>
    <DebuggerLink
      href="https://developers.facebook.com/tools/debug/"
      target="_blank"
      rel="noopenerkj"
    >
      Check Facebook
    </DebuggerLink>
    <DebuggerLink
      href="https://www.linkedin.com/post-inspector/inspect/"
      target="_blank"
      rel="noopenerkj"
    >
      Check LinkedIn
    </DebuggerLink>
  </DebuggerContainer>
);

const UrlWrapper = styled.p(
  css({
    bg: "secondary",
    p: 2,
    cursor: "pointer",
    transition: "background-color 250ms ease-in-out",

    "&:hover": {
      bg: "primary",

      a: {
        color: "white",
      },
    },
  }),
);

const CustomUrl = () => {
  const { customUrl } = useOG();

  return (
    <StyledCustomUrl>
      <p>
        Edit the metatags and use the generated URL to see what the link would
        look like when shared on social.
      </p>

      <DebuggerLinks />

      {customUrl != null && (
        <UrlWrapper>
          <a href={customUrl} target="_blank" rel="noopener">
            {customUrl}
          </a>
        </UrlWrapper>
      )}
    </StyledCustomUrl>
  );
};

export default CustomUrl;
