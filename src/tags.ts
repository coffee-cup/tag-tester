import { MetaCategory } from "./types";

export const htmlTags = ["description"];

export const twitterTags = [
  "twitter:card",
  "twitter:creator",
  "twitter:title",
  "twitter:description",
];

export const openGraphTags = [
  "og:title",
  "og:description",
  "og:url",
  "og:image",
  "og:site_name",
  "og:video",
  "og:audio",
];

const allTags = [...htmlTags, ...twitterTags, ...openGraphTags];

export const importantTags: { [k in MetaCategory]: string[] } = {
  html: htmlTags,
  twitter: twitterTags,
  opengraph: openGraphTags,
};

export const isImportantTag = (name: string, property: string): boolean =>
  allTags.includes(name) || allTags.includes(property);
