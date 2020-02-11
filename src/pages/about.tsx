import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { withLayout } from "../components/Layout";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";

const StyledAbout = styled.div(css({}));

const Full = styled.div(
  css({
    minHeight: "100vh",
  }),
);
const Home = () => {
  return (
    <StyledAbout>
      <Full>
        <Header small />
        <Container>
          <h1>About Tag Tester</h1>
          <p>TODO</p>

          <p>
            <Link href="/">
              <a>Back</a>
            </Link>
          </p>
        </Container>
      </Full>

      <Footer />
    </StyledAbout>
  );
};

export default withLayout(Home);
