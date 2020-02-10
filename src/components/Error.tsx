import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import Section from "./Section";
import Container from "./Container";

const StyledError = styled.div(
  css({
    py: 4,
  }),
);

const Error = () => {
  const { results } = useOG();

  if (results.type !== "error") {
    return null;
  }

  return (
    <StyledError>
      <Section>
        <Container>{results.message}</Container>
      </Section>
    </StyledError>
  );
};

export default Error;
