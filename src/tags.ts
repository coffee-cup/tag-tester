import { MetaTag, FilterType } from "./types";
import { rootUrl } from "./utils";

export const htmlTags = ["title", "description", "image"];

export const twitterPrefix = "twitter:";
export const ogPrefix = "og:";

export const isTwitterTag = (tag: MetaTag): boolean => {
  const name = getName(tag);
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
  const name = getName(tag);
  const isRecommended = onlyRecommended ? htmlTags.includes(name) : true;
  return name != null && !isOGTag(tag) && !isTwitterTag(tag) && isRecommended;
};

const imageRegex = /^.*:?image$/;
export const isImageTag = (tag: MetaTag): boolean => {
  const name = getName(tag);
  return imageRegex.test(name);
};

export const getNameProp = (tag: MetaTag): string =>
  tag.name != null ? "name" : "property";

export const getValueProp = (tag: MetaTag): string =>
  tag.content != null ? "content" : "value";

export const getName = (tag: MetaTag): string => tag.name ?? tag.property;

export const getValue = (tag: MetaTag): string => tag.content ?? tag.value;

export const makeTag = (
  name: string,
  content: string | undefined,
): MetaTag => ({
  [name.startsWith(ogPrefix) ? "property" : "name"]: name,
  [name.startsWith(twitterPrefix) ? "value" : "content"]: content,
});

export const createCustomUrl = (
  url: string,
  customTags: { [key: string]: string | undefined },
): string => {
  const query = {
    url,
    ...customTags,
  };

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

export const getBase = (s: string): string =>
  s.replace(/^og:/, "").replace(/^twitter:/, "");

export const editTagFromTags = (
  name: string,
  value: string,
  tags: MetaTag[],
  syncSimilar: boolean = false,
): {
  newTags: MetaTag[];
  edited: { [key: string]: string };
} => {
  const edited: { [key: string]: string } = {};
  const newTags = tags.map(t => {
    if (
      t[getNameProp(t)] === name ||
      (syncSimilar && getBase(name) === getBase(t[getNameProp(t)]))
    ) {
      edited[getName(t)] = value;

      return {
        ...t,
        [getValueProp(t)]: value,
      };
    }

    return t;
  });

  return {
    newTags,
    edited,
  };
};

export const deleteTagFromTags = (
  tag: MetaTag,
  tags: MetaTag[],
): {
  newTags: MetaTag[];
  edited: { [key: string]: string | undefined };
} => {
  const newTags = tags.filter(t => t !== tag);
  const edited = {
    [getName(tag)]: undefined,
  };

  return { newTags, edited };
};

export const createNewTag = (
  name: string,
  content: string,
  tags: MetaTag[],
): {
  newTags: MetaTag[];
  edited: { [key: string]: string };
} => {
  const newTag = makeTag(name, content);
  const edited = {
    [name]: content,
  };

  return {
    newTags: [...tags, newTag],
    edited,
  };
};
