import { MetaTag } from "./types";
import { rootUrl } from "./utils";

export enum FilterType {
  Html,
  OpenGraph,
  Twitter,
}

export const htmlTags = ["title", "description"];

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

export const isHTMLTag = (
  tag: MetaTag,
  onlyRecommended: boolean = true,
): boolean => {
  const name = tag.name ?? tag.property;
  const isRecommended = onlyRecommended ? htmlTags.includes(name) : true;
  return name != null && !isOGTag(tag) && !isTwitterTag(tag) && isRecommended;
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

export const createCustomUrl = (
  url: string,
  customTags: Map<string, string>,
): string => {
  const query = {
    url,
  };

  for (const [name, value] of Array.from(customTags.entries())) {
    query[name] = value;
  }

  const queryString = Object.keys(query)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
    .join("&");

  return `${rootUrl}/api/page?${queryString}`;
};

export const getFilteredTags = (
  tags: MetaTag[],
  filters: FilterType[],
  onlyRecommended: boolean,
): MetaTag[] => {
  return [
    ...(filters.includes(FilterType.Html)
      ? tags.filter(t => isHTMLTag(t, onlyRecommended))
      : []),
    ...(filters.includes(FilterType.OpenGraph) ? tags.filter(isOGTag) : []),
    ...(filters.includes(FilterType.Twitter) ? tags.filter(isTwitterTag) : []),
  ];
};
