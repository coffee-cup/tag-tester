import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import Link from "next/link";

const StyledInfo = styled.div(
  css({
    maxWidth: "measure",
    px: [0, 0, 2],
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

  return (
    <StyledInfo className="info">
      <h3>What</h3>

      <p>
        When you enter a url above, we will fetch all metadata tags. You can
        edit those tags and use the generated url to test what it will look like
        when shared on social.
      </p>

      {results.type === "success" && (
        <UrlContainer>
          <a href={results.customUrl}>{results.customUrl}</a>
        </UrlContainer>
      )}

      <h3>Social sites</h3>

      <DebuggerLinks />

      <h3>Help</h3>

      <ul>
        <li>
          <a href="https://www.wordstream.com/meta-tags">
            What are metadata tags
          </a>
        </li>
        <li>
          <Link href="/about">
            <a>What is this site</a>
          </Link>
        </li>
      </ul>
    </StyledInfo>
  );
};

export default Info;
