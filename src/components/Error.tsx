import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";

const StyledError = styled.div(
  css({
    color: "darkred",
    p: 2,
  }),
);

export interface Props {
  error: string;
}

const Error: React.FC<Props> = ({ error }) => {
  return (
    <StyledError>
      <h3>Error</h3>
      {error} D:
    </StyledError>
  );
};

export default Error;
