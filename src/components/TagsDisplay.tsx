import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";

const StyledTagsDisplay = styled.div(
  css({
    whiteSpace: "pre",
  }),
);

const TagsDisplay = () => {
  const { tags } = useOG();

  return <StyledTagsDisplay>{JSON.stringify(tags, null, 2)}</StyledTagsDisplay>;
};

export default TagsDisplay;
