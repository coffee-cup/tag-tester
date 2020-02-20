/** @jsx jsx */
import * as React from "react";
import { Box, jsx, Styled } from "theme-ui";

export interface Props {
  error: string;
}

const Error: React.FC<Props> = ({ error }) => {
  return (
    <Box color="darkred">
      <Styled.h2>Error</Styled.h2>
      {error} D:
    </Box>
  );
};

export default Error;
