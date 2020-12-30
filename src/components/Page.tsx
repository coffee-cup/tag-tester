/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Box, jsx } from "theme-ui";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Info from "../components/Info";
import Results from "../components/Results";
import { useOG } from "../context";

const Split = styled.div<{ success: boolean }>(props =>
  css({
    display: ["grid"],
    gridTemplateColumns: ["100%", !props.success ? "50% 50%" : "40% 60%"],
    gap: 4,
    py: [4, 5],

    transition: "grid-template-columns 50ms ease-out",
  }),
);

export const Page: React.FC = () => {
  const { results } = useOG();

  return (
    <Box className="home">
      <Box sx={{ minHeight: "100vh" }}>
        <Header />

        <Container large={results.type === "success"}>
          <Split success={results.type === "success"}>
            <Info />
            <Results />
          </Split>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};
