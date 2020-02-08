import { DefaultSeoProps } from "next-seo";

const title = "Tag Tester";
const url = "https://tag-tester.now.sh/";
const description =
  "Test your websites html, open graph and twitter metadata tags.";

const config: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    site_name: title,
  },
  twitter: {
    handle: "@jakerunzer",
    cardType: "summary",
  },
};

export default config;
