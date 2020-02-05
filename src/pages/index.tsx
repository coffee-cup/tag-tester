import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { withLayout } from "../components/Layout";
import UrlForm from "../components/UrlForm";
import TagsDisplay from "../components/TagsDisplay";
import { useOG } from "../context";

const StyledHome = styled.div(css({}));

const Home = () => {
  const { tags, error } = useOG();

  return (
    <StyledHome>
      <h1>Open Graph Tester</h1>

      <UrlForm />

      {tags != null && <TagsDisplay />}
      {error != null && error}
    </StyledHome>
  );
};

export default withLayout(Home);
