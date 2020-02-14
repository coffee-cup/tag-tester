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
import { useOG } from "../context";

const StyledHome = styled.div(css({}));

const Full = styled.div(
  css({
    minHeight: "100vh",
  }),
);

const Split = styled.div<{ notFetched: boolean }>(props =>
  css({
    display: ["block", "block", "grid"],
    gridTemplateColumns: props.notFetched ? "50% 50%" : "40% 60%",
    py: 4,

    transition: "grid-template-columns 50ms ease-out",
  }),
);

const Home: NextPage = () => {
  const { results } = useOG();

  return (
    <StyledHome>
      <Full>
        <Header />

        <Container large={results.type !== "not-fetched"}>
          <Split notFetched={results.type === "not-fetched"}>
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
