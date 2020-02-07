import { MetaTag } from "./types";

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

export const twitterPrefix = "twitter:";
export const ogPrefix = "og:";

export const isTwitterTag = (tag: MetaTag): boolean => {
  const name = tag.name ?? tag.property;
  return name != null && name.startsWith(twitterPrefix);
};

export const isOGTag = (tag: MetaTag): boolean => {
  const name = tag.name ?? tag.property;
  return name != null && name.startsWith(ogPrefix);
};

const imageRegex = /^.*:?image$/;
export const isImageTag = (tag: MetaTag): boolean => {
  const name = tag.name ?? tag.property;
  return imageRegex.test(name);
};
