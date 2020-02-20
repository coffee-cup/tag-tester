/** @jsx jsx */
import copy from "copy-to-clipboard";
import * as React from "react";
import { Box, Flex, jsx, Link, Styled, Text } from "theme-ui";
import { useOG } from "../context";

const DebuggerLinks = () => (
  <Styled.ul>
    <Styled.li>
      <Link
        href="https://cards-dev.twitter.com/validator"
        target="_blank"
        rel="noopenerkj"
      >
        Twitter card validator
      </Link>
    </Styled.li>
    <Styled.li>
      <Link
        href="https://developers.facebook.com/tools/debug/"
        target="_blank"
        rel="noopenerkj"
      >
        Facebook debugger
      </Link>
    </Styled.li>
    <Styled.li>
      <Link
        href="https://www.linkedin.com/post-inspector/inspect/"
        target="_blank"
        rel="noopenerkj"
      >
        LinkedIn inspector
      </Link>
    </Styled.li>
  </Styled.ul>
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
    <Box
      className="url-container"
      sx={{
        my: 4,
        px: 2,
        py: 3,
        bg: "muted",
        borderRadius: "2px",
        wordBreak: "break-all",
        transition: "all 150ms ease-in-out",

        "&:hover": {
          bg: "primary",
          color: "white",
        },
      }}
    >
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 1,
          mb: 1,
        }}
      >
        <Text>Your generated URL</Text>
        <span
          sx={{ cursor: "pointer" }}
          onClick={() => {
            copyText(results.customUrl);
          }}
        >
          {showCopied ? "copied!" : "copy"}
        </span>
      </Flex>

      <Link
        href={results.customUrl}
        target="_blank"
        rel="noopener"
        variant="none"
      >
        {results.customUrl}
      </Link>
    </Box>
  );
};

export const Info = () => {
  return (
    <Box className="info">
      <Styled.h2>Getting Started</Styled.h2>

      <Styled.p>
        When you enter a url above, we will fetch all metadata tags. You can
        edit those tags and use the generated url to test what it will look like
        when shared on social.
      </Styled.p>

      <UrlContainer />

      <Styled.h2>Social Sites</Styled.h2>

      <Styled.p>Test the generated URL on the following sites.</Styled.p>

      <DebuggerLinks />

      <Styled.h2>Learn More</Styled.h2>

      <Styled.ul>
        <Styled.li>
          <Link
            href="https://www.wordstream.com/meta-tags"
            target="_blank"
            rel="noopener"
          >
            What are metatags
          </Link>
        </Styled.li>

        <Styled.li>
          <Link href="https://ogp.me/" target="_blank" rel="noopener">
            Open graph protocol
          </Link>
        </Styled.li>

        <Styled.li>
          <Link
            href="https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup"
            target="_blank"
            rel="noopener"
          >
            Twitter cards
          </Link>
        </Styled.li>
      </Styled.ul>
    </Box>
  );
};

export default Info;
