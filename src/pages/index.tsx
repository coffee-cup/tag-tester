/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { NextPage } from "next";
import { jsx, Box } from "theme-ui";
import * as api from "../api";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Info from "../components/Info";
import { withLayout } from "../components/Layout";
import Results from "../components/Results";
import { useOG } from "../context";

const Split = styled.div<{ notFetched: boolean }>(props =>
  css({
    display: ["grid"],
    gridTemplateColumns: ["100%", props.notFetched ? "50% 50%" : "40% 60%"],
    gap: 4,
    py: [4, 5],

    transition: "grid-template-columns 50ms ease-out",
  }),
);

const Home: NextPage = () => {
  const { results } = useOG();

  return (
    <Box className="home">
      <Box sx={{ minHeight: "100vh" }}>
        <Header />

        <Container large={results.type !== "not-fetched"}>
          <Split notFetched={results.type === "not-fetched"}>
            <Info />
            <Results />
          </Split>
        </Container>
      </Box>

      <Footer />
    </Box>
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
        error: { message: e.message },
        fetchedUrl: url,
      };
    }
  }

  return {};
};

export default Page;
