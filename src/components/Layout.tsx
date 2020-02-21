/** @jsx jsx */
import Head from "next/head";
import * as React from "react";
import { Box, jsx, ThemeProvider } from "theme-ui";
import { OGProvider } from "../context";
import theme from "../styles";
import { TagResult } from "../types";
import SEO from "./SEO";

const Layout: React.FC<{
  tagResult?: TagResult;
  error?: { message: string };
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
            src="https://cdn.simpleanalytics.io/hello.js"
          ></script>
          <noscript>
            <img src="https://api.simpleanalytics.io/hello.gif" alt="" />
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
        <Box
          as="main"
          className="content"
          sx={{
            color: "text",
            bg: "background",
            mx: "auto",
          }}
        >
          {props.children}
        </Box>
      </OGProvider>
    </ThemeProvider>
  );
};

export const withLayout = (Wrapped: React.ComponentType) => (props: any) => (
  <Layout {...props}>
    <Wrapped {...props} />
  </Layout>
);
