import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { withLayout } from "../components/Layout";
import Results from "../components/Results";
import Section from "../components/Section";
import Error from "../components/Error";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useOG } from "../context";
import Info from "../components/Info";

const StyledHome = styled.div(css({}));

const Full = styled.div(
  css({
    minHeight: "100vh",
  }),
);

const Home = () => {
  const { results } = useOG();

  return (
    <StyledHome>
      <Full>
        <Header />

        <Error />

        {results && (
          <Section>
            <Info />

            <Results />
          </Section>
        )}
      </Full>

      <Footer />
    </StyledHome>
  );
};

export default withLayout(Home);
