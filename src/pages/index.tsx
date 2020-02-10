import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { withLayout } from "../components/Layout";
import Results from "../components/Results";
import Container from "../components/Container";
import Error from "../components/Error";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Info from "../components/Info";

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

const Home = () => {
  return (
    <StyledHome>
      <Full>
        <Header />
        <Error />

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

export default withLayout(Home);
