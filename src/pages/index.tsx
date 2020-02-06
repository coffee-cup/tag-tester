import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { withLayout } from "../components/Layout";
import Results from "../components/Results";
import Header from "../components/Header";
import Container from "../components/Container";
import { useOG } from "../context";

const StyledHome = styled.div(css({}));

const Home = () => {
  const { results, error } = useOG();

  return (
    <StyledHome>
      <Header />

      <Container>
        {results != null && <Results />}
        {error != null && error}
      </Container>
    </StyledHome>
  );
};

export default withLayout(Home);
