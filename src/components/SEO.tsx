import * as React from "react";
import { DefaultSeo } from "next-seo";
import defaultConfig from "../next-seo.config";
import { useOG } from "../context";
import Head from "next/head";

const SEO: React.FC = () => {
  const { results, url } = useOG();

  return (
    <>
      <DefaultSeo {...defaultConfig} />

      {results.type === "success" && (
        <Head>
          <title>
            {url} - {defaultConfig.title}
          </title>
        </Head>
      )}
    </>
  );
};

export default SEO;
