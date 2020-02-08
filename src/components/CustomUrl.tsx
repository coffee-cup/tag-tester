import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Section from "./Section";
import Container from "./Container";
import { useOG } from "../context";

const StyledCustomUrl = styled.div(
  css({
    backgroundColor: "muted",
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
      Twitter
    </DebuggerLink>
    <DebuggerLink
      href="https://developers.facebook.com/tools/debug/"
      target="_blank"
      rel="noopenerkj"
    >
      Facebook
    </DebuggerLink>
    <DebuggerLink
      href="https://www.linkedin.com/post-inspector/inspect/"
      target="_blank"
      rel="noopenerkj"
    >
      LinkedIn
    </DebuggerLink>
  </DebuggerContainer>
);

const CustomUrl = () => {
  const { customUrl } = useOG();

  return (
    <StyledCustomUrl>
      <Container>
        <Section>
          {customUrl == null ? (
            <h3>
              You can edit the metatags and test in the following debuggers
            </h3>
          ) : (
            <div>
              <h4>
                Use this URL in the following debuggers to test the changes
                you've made.
              </h4>
            </div>
          )}

          <DebuggerLinks />

          {customUrl != null && (
            <p>
              <a href={customUrl} target="_blank" rel="noopener">
                {customUrl}
              </a>
            </p>
          )}
        </Section>
      </Container>
    </StyledCustomUrl>
  );
};

export default CustomUrl;
