import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { withLayout } from "../components/Layout";
import Results from "../components/Results";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { useOG } from "../context";
import CustomUrl from "../components/CustomUrl";

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

        <CustomUrl />

        <Container>
          {results != null && <Results />}
          {error != null && error}
        </Container>
      </Full>

      <Footer />
    </StyledHome>
  );
};

export default withLayout(Home);
