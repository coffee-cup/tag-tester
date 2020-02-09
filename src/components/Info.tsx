import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import Container from "./Container";
import { isTwitterTag, isOGTag } from "../tags";
import CustomUrl from "./CustomUrl";

const StyledInfo = styled.div(css({}));

const Title = styled.h2(
  css({
    mb: 2,
  }),
);

export const Info = () => {
  const { results } = useOG();
  const { tags } = results;

  const numTwitter = tags.filter(t => isTwitterTag(t)).length;
  const numOG = tags.filter(t => isOGTag(t)).length;
  const numHtml = tags.length - numTwitter - numOG;

  return (
    <StyledInfo>
      <Container>
        <Title>Metatags found</Title>

        <p>
          <em>{numHtml} html</em> tags, <em>{numOG} open graph</em> tags, and{" "}
          <em>{numTwitter} twitter</em> tags
        </p>

        <CustomUrl />
      </Container>
    </StyledInfo>
  );
};

export default Info;
