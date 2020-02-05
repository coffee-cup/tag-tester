import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Button from "../components/Button";
import { validURL } from "../utils";
import { Label } from "theme-ui";

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

      const query = `page=${encodeURIComponent(url)}`;

      const html = await fetch(`/api/html?${query}`).then(res => res.json());
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
          <Label htmlFor="url">page url</Label>
          <Input
            name="url"
            value={url}
            placeholder="URL you want to test"
            onChange={e => {
              setUrl(e.target.value);
            }}
          />

          <Button primary>Go</Button>
        </form>
      </StyledHome>
    </Layout>
  );
};

export default Home;
