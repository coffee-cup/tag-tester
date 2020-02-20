/** @jsx jsx */
import * as React from "react";
import { Box, jsx, Styled } from "theme-ui";
import Examples from "./Examples";

export interface Props {
  error: string;
}

const Error: React.FC<Props> = ({ error }) => {
  return (
    <Box>
      <Box className="error" color="darkred" mb={5}>
        <Styled.h2>Error</Styled.h2>
        {error} D:
      </Box>

      <Examples />
    </Box>
  );
};

export default Error;
