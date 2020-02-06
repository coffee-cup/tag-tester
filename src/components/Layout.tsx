import * as React from "react";
import { ThemeProvider, Styled } from "theme-ui";
import theme from "../styles";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { OGProvider } from "../context";

const Content = styled(Styled.root)(
  css({
    color: "text",
    backgroundColor: "background",
    mx: "auto",
    fontSize: 2,
  }),
);

const Layout: React.FC = props => (
  <ThemeProvider theme={theme}>
    <OGProvider>
      <Content>{props.children}</Content>
    </OGProvider>
  </ThemeProvider>
);

export const withLayout = (Wrapped: React.ComponentType) => () => (
  <Layout>
    <Wrapped />
  </Layout>
);
