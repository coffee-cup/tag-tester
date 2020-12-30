/** @jsx jsx */
import { NextPage } from "next";
import { withLayout } from "../components/Layout";
import { Page as MainPage } from "../components/Page";
import * as api from "../api";

const Page = withLayout(MainPage) as NextPage;

Page.getInitialProps = async ({ query }) => {
  const url = query.url;

  if (url != null && !Array.isArray(url)) {
    try {
      const tagResult = await api.fetchTags(url as string);
      return {
        tagResult,
      };
    } catch (e) {
      return {
        error: { message: e.message },
        fetchedUrl: url,
      };
    }
  }

  return {};
};

export default Page;
