import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Section from "./Section";
import { useOG } from "../context";

const StyledCustomUrl = styled.div(css({}));

const CustomUrl = () => {
  const { customUrl } = useOG();

  return (
    <Section>
      <StyledCustomUrl>
        <a href={customUrl} target="_blank" rel="noopener">
          {customUrl}
        </a>
      </StyledCustomUrl>
    </Section>
  );
};

export default CustomUrl;
