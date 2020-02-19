import { DefaultSeoProps } from "next-seo";

const title = "Tag Tester";
const url = "https://tagtester.dev";
const description =
  "Test your websites html, open graph and twitter metadata tags.";
const image = "https://tagtester.dev/tagtester.png";

const config: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    site_name: title,
    images: [
      {
        url: image,
        width: 1024,
        height: 1024,
      },
    ],
  },
  twitter: {
    handle: "@jakerunzer",
    cardType: "summary",
  },
};

export default config;
