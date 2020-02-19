import * as React from "react";
import { ThemeProvider, Styled } from "theme-ui";
import theme from "../styles";
import { TagResult } from "../types";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { OGProvider } from "../context";
import SEO from "./SEO";
import Head from "next/head";

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
        <Head>
          <script
            async
            defer
            src="https://hello.jakerunzer.com/app.js"
          ></script>
          <noscript>
            <img src="https://hello.jakerunzer.com/image.gif" alt="" />
          </noscript>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>

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
