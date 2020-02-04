import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Button from "../components/Button";
import { validURL } from "../utils";

const StyledHome = styled.div(css({}));

const Home = () => {
  const [url, setUrl] = React.useState("https://jakerunzer.com");
  const [error, setError] = React.useState<string | null>(null);

  const isError = error != null;

  React.useEffect(() => {
    if (!validURL(url)) {
      setError("Invalid URL");
    }
  }, [url]);

  const fetchOgData = () => {
    (async () => {
      if (isError) {
        console.log("NO FETCHING");
        return;
      }

      const html = await fetch(url, {
        mode: "cors",
      }).then(res => res.text());
      console.log(html);
    })();
  };

  return (
    <Layout>
      <StyledHome>
        <h1>Open Graph Tester</h1>

        <form
          onSubmit={e => {
            e.preventDefault();
            fetchOgData();
          }}
        >
          <Input
            value={url}
            placeholder="URL you want to test"
            onChange={e => {
              setUrl(e.target.value);
            }}
            large
          />

          <Button primary>Go</Button>
        </form>
      </StyledHome>
    </Layout>
  );
};

export default Home;
