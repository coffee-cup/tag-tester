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

export const getNameProp = (tag: MetaTag): string =>
  tag.name != null ? "name" : "property";

export const getValueProp = (tag: MetaTag): string =>
  tag.content != null ? "content" : "value";

export const createCustomUrl = (url: string, tags: MetaTag[]): string => {
  const query = {
    url,
  };

  for (const t of tags) {
    query[t.name ?? t.property] = t.content ?? t.value;
  }

  const queryString = Object.keys(query)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
    .join("&");

  return `http://localhost:3000/api/page?${queryString}`;
};
