/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import Container from "./Container";
import UrlForm from "./UrlForm";
import Link from "next/link";
import { jsx } from "theme-ui";

const StyledHeader = styled.header<{ small?: boolean }>(props =>
  css({
    background: props =>
      `linear-gradient(to bottom right,
         ${props.colors.primary}, ${props.colors.accent})`,
    color: "white",
    textShadow: "1px 1px 10px #3333334f",
    pb: 3,
    py: props.small ? 5 : 6,

    a: {
      textDecoration: "none",
    },
  }),
);

const Title = styled.h1(
  css({
    mb: 3,
    color: "white",
    textDecoration: "none",
  }),
);

const SubTitle = styled.p(
  css({
    mb: 4,
    textShadow: "1px 1px 10px #333333a1",
  }),
);

const Header: React.FC<{ small?: boolean }> = props => (
  <StyledHeader small={props.small}>
    <Container>
      {!props.small && (
        <>
          <Link href="/">
            <a>
              <Title>Tag Tester</Title>
            </a>
          </Link>
          <SubTitle>
            Test and edit your websites HTML, open graph, and twitter metadata
            tags
          </SubTitle>

          <UrlForm />
        </>
      )}
    </Container>
  </StyledHeader>
);

export default Header;
