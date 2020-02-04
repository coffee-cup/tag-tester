import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Layout from "../components/Layout";
import Input from "../components/Input";

const StyledHome = styled.div(css({}));

const Home = () => (
  <Layout>
    <StyledHome>
      <h1>Open Graph Tester</h1>

      <Input value="This is large" large />
      <Input value="This is the value" />
      <Input placeholder="Enter the value here" />
    </StyledHome>
  </Layout>
);

export default Home;
