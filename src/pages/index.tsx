import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { withLayout } from "../components/Layout";
import Results from "../components/Results";
import Section from "../components/Section";
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
  const { results, error } = useOG();

  return (
    <StyledHome>
      <Full>
        <Header />

        {error != null && error}

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
