import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Layout from "../components/Layout";

const StyledHome = styled.div(css({}));

const Home = () => (
  <Layout>
    <StyledHome>
      <h1>Boop</h1>
    </StyledHome>
  </Layout>
);

export default Home;
