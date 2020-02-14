import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import Link from "next/link";
import copy from "copy-to-clipboard";

const StyledInfo = styled.div(
  css({
    maxWidth: "measure",
    px: [0, 0, 2],
    pb: [0, 0, 4],
    pt: 4,
  }),
);

const StyledUrlContainer = styled.div(
  css({
    bg: "secondary",
    p: 2,
    fontSize: 1,
    wordBreak: "break-all",
    transition: "all 250ms ease-in-out",

    a: {
      color: "black",
    },

    "&:hover": {
      bg: "primary",
      color: "white",
      a: {
        bg: "transparent",
        color: "white",
      },
    },
  }),
);

const UrlContainerHeader = styled.div(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  }),
);

const CopyButton = styled.span(
  css({
    cursor: "pointer",
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

const useCopy = (): [boolean, (text: string) => void] => {
  const [showCopied, setShowCopied] = React.useState(false);
  const copyText = (text: string) => {
    copy(text);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  return [showCopied, copyText];
};

const UrlContainer = () => {
  const { results } = useOG();
  const [showCopied, copyText] = useCopy();

  if (results.type !== "success") {
    return null;
  }

  return (
    <StyledUrlContainer>
      <UrlContainerHeader>
        <span>Your generated URL</span>
        <CopyButton
          onClick={() => {
            copyText(results.customUrl);
          }}
        >
          {showCopied ? "copied!" : "copy"}
        </CopyButton>
      </UrlContainerHeader>
      <a href={results.customUrl}>{results.customUrl}</a>
    </StyledUrlContainer>
  );
};

export const Info = () => {
  return (
    <StyledInfo className="info">
      <h3>What</h3>

      <p>
        When you enter a url above, we will fetch all metadata tags. You can
        edit those tags and use the generated url to test what it will look like
        when shared on social.
      </p>

      <UrlContainer />

      <h3>Social sites</h3>

      <DebuggerLinks />

      <h3>Help</h3>

      <ul>
        <li>
          <a
            href="https://www.wordstream.com/meta-tags"
            target="_blank"
            rel="noopener"
          >
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
