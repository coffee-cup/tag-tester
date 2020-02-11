import styled from "@emotion/styled";
import css from "@styled-system/css";
import { NextPage } from "next";
import * as React from "react";
import * as api from "../api";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Info from "../components/Info";
import { withLayout } from "../components/Layout";
import Results from "../components/Results";

const StyledHome = styled.div(css({}));

const Full = styled.div(
  css({
    minHeight: "100vh",
  }),
);

const Split = styled.div(
  css({
    display: ["block", "block", "grid"],
    gridTemplateColumns: "1fr 1fr",
  }),
);

const Home: NextPage = () => {
  return (
    <StyledHome>
      <Full>
        <Header />

        <Container large>
          <Split>
            <Info />
            <Results />
          </Split>
        </Container>
      </Full>

      <Footer />
    </StyledHome>
  );
};

const Page = withLayout(Home) as NextPage;

Page.getInitialProps = async ({ query }) => {
  const url = query.url;

  if (url != null && !Array.isArray(url)) {
    try {
      const tagResult = await api.fetchTags(url as string);
      return {
        tagResult,
      };
    } catch (e) {
      return {
        error: e.message,
        fetchedUrl: url,
      };
    }
  }

  return {};
};

export default Page;
