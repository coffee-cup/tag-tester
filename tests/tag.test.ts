import {
  createCustomUrl,
  getFilteredTags,
  isTwitterTag,
  getNameProp,
  getValueProp,
  isOGTag,
  isHTMLTag,
  ogPrefix,
  twitterPrefix,
  getBase,
} from "../src/tags";
import { MetaTag, FilterType } from "../src/types";

const makeTag = (name: string, content: string): MetaTag => ({
  [name.startsWith(ogPrefix) ? "property" : "name"]: name,
  [name.startsWith(twitterPrefix) ? "value" : "content"]: content,
});

describe("tags", () => {
  it("checks if tag is a twitter tag", () => {
    expect(isTwitterTag(makeTag("twitter:image", ""))).toBe(true);
    expect(isTwitterTag(makeTag("og:image", ""))).toBe(false);
    expect(isTwitterTag(makeTag("image", ""))).toBe(false);
  });

  it("checks if tag is a og tag", () => {
    expect(isOGTag(makeTag("twitter:image", ""))).toBe(false);
    expect(isOGTag(makeTag("og:image", ""))).toBe(true);
    expect(isOGTag(makeTag("image", ""))).toBe(false);
  });

  it("checks if tag is an html tag", () => {
    expect(isHTMLTag(makeTag("twitter:image", ""))).toBe(false);
    expect(isHTMLTag(makeTag("og:image", ""))).toBe(false);
    expect(isHTMLTag(makeTag("image", ""))).toBe(true);
  });

  it("check if html tag is recommended", () => {
    expect(isHTMLTag(makeTag("title", ""))).toBe(true);
    expect(isHTMLTag(makeTag("viewport", ""))).toBe(false);
  });

  it("getting name and value props", () => {
    expect(getNameProp(makeTag("image", ""))).toBe("name");
    expect(getNameProp(makeTag("twitter:image", ""))).toBe("name");
    expect(getNameProp(makeTag("og:image", ""))).toBe("property");

    expect(getValueProp(makeTag("image", ""))).toBe("content");
    expect(getValueProp(makeTag("twitter:image", ""))).toBe("value");
    expect(getValueProp(makeTag("og:image", ""))).toBe("content");
  });

  it("creates a custom url", () => {
    expect(createCustomUrl("https://tagtester.dev", {})).toBe(
      "https://tagtester.dev/api/page?url=https%3A%2F%2Ftagtester.dev",
    );
    expect(
      createCustomUrl("https://tagtester.dev", {
        title: "a test",
        desc: "hello",
      }),
    ).toBe(
      "https://tagtester.dev/api/page?url=https%3A%2F%2Ftagtester.dev&title=a%20test&desc=hello",
    );
  });

  it("gets filtered tags", () => {
    const tags = [
      makeTag("title", "this is title"),
      makeTag("viewport", "this is viewport"),
      makeTag("og:image", "this is image"),
      makeTag("twitter:card", "this is card"),
    ];

    expect(getFilteredTags(tags, [], true)).toEqual([]);
    expect(
      getFilteredTags(
        tags,
        [FilterType.Html, FilterType.OpenGraph, FilterType.Twitter],
        true,
      ),
    ).toEqual([tags[0], tags[2], tags[3]]);
    expect(getFilteredTags(tags, [FilterType.Html], true)).toEqual([tags[0]]);
    expect(getFilteredTags(tags, [FilterType.Html], false)).toEqual([
      tags[0],
      tags[1],
    ]);
  });

  it("gets base of tag name", () => {
    expect(getBase("title")).toBe("title");
    expect(getBase("og:title")).toBe("title");
    expect(getBase("twitter:title")).toBe("title");
  });
});
