import * as React from "react";
import { ThemeProvider, Styled } from "theme-ui";
import theme from "../styles";
import { TagResult } from "../types";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { OGProvider } from "../context";
import SEO from "./SEO";

const Content = styled(Styled.root)(
  css({
    color: "text",
    backgroundColor: "background",
    mx: "auto",
    fontSize: 2,
  }),
);

const Layout: React.FC<{
  tagResult?: TagResult;
  error?: string;
  fetchedUrl?: string;
}> = props => {
  return (
    <ThemeProvider theme={theme}>
      <OGProvider
        tagResult={props.tagResult}
        error={props.error}
        url={props.fetchedUrl}
      >
        <SEO />
        <Content>{props.children}</Content>
      </OGProvider>
    </ThemeProvider>
  );
};

export const withLayout = (Wrapped: React.ComponentType) => (props: any) => (
  <Layout {...props}>
    <Wrapped {...props} />
  </Layout>
);
