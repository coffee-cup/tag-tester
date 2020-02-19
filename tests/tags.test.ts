import {
  createCustomUrl,
  getFilteredTags,
  isTwitterTag,
  getName,
  getValue,
  getNameProp,
  editTagFromTags,
  deleteTagFromTags,
  getValueProp,
  isOGTag,
  isHTMLTag,
  getBase,
  makeTag,
  createNewTag,
} from "../src/tags";
import { FilterType } from "../src/types";

describe("tags", () => {
  it("cam create tags", () => {
    expect(makeTag("title", "test")).toEqual({
      name: "title",
      content: "test",
    });

    expect(makeTag("og:title", "test")).toEqual({
      property: "og:title",
      content: "test",
    });

    expect(makeTag("twitter:title", "test")).toEqual({
      name: "twitter:title",
      value: "test",
    });
  });

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

  it("checks if html tag is recommended", () => {
    expect(isHTMLTag(makeTag("title", ""))).toBe(true);
    expect(isHTMLTag(makeTag("viewport", ""))).toBe(false);
  });

  it("can get name and value props", () => {
    expect(getNameProp(makeTag("image", ""))).toBe("name");
    expect(getNameProp(makeTag("twitter:image", ""))).toBe("name");
    expect(getNameProp(makeTag("og:image", ""))).toBe("property");

    expect(getValueProp(makeTag("image", ""))).toBe("content");
    expect(getValueProp(makeTag("twitter:image", ""))).toBe("value");
    expect(getValueProp(makeTag("og:image", ""))).toBe("content");
  });

  it("gets name and values", () => {
    expect(getName(makeTag("image", ""))).toBe("image");
    expect(getName(makeTag("twitter:image", ""))).toBe("twitter:image");
    expect(getName(makeTag("og:image", ""))).toBe("og:image");

    expect(getValue(makeTag("image", "test 1"))).toBe("test 1");
    expect(getValue(makeTag("twitter:image", "test 2"))).toBe("test 2");
    expect(getValue(makeTag("og:image", "test 3"))).toBe("test 3");
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
    expect(createCustomUrl("https://tagtester.dev", { title: undefined })).toBe(
      "https://tagtester.dev/api/page?url=https%3A%2F%2Ftagtester.dev&title=undefined",
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

  it("creates new tag", () => {
    const tags = [makeTag("title", "this is title")];

    {
      const { newTags, edited } = createNewTag("hello", "world", []);
      expect(newTags).toEqual([makeTag("hello", "world", true)]);
      expect(edited).toEqual({ hello: "world" });
    }

    {
      const { newTags, edited } = createNewTag("hello", "world", tags);
      expect(newTags).toEqual([...tags, makeTag("hello", "world", true)]);
      expect(edited).toEqual({ hello: "world" });
    }
  });

  it("edits tags", () => {
    const tags = [
      makeTag("title", "this is title"),
      makeTag("viewport", "this is viewport"),
      makeTag("og:title", "this is image"),
      makeTag("twitter:title", "this is card"),
    ];

    {
      const { newTags, edited } = editTagFromTags(
        "title",
        "new title",
        tags,
        false,
      );
      expect(newTags).toEqual([
        makeTag("title", "new title"),
        tags[1],
        tags[2],
        tags[3],
      ]);
      expect(edited).toEqual({ title: "new title" });
    }

    {
      const { newTags, edited } = editTagFromTags(
        "title",
        "new title",
        tags,
        true,
      );
      expect(newTags).toEqual([
        makeTag("title", "new title"),
        tags[1],
        makeTag("og:title", "new title"),
        makeTag("twitter:title", "new title"),
      ]);
      expect(edited).toEqual({
        title: "new title",
        "og:title": "new title",
        "twitter:title": "new title",
      });
    }
  });

  it("deletes tags", () => {
    const tags = [
      makeTag("title", "this is title"),
      makeTag("viewport", "this is viewport"),
      makeTag("og:title", "this is image"),
      makeTag("twitter:title", "this is card"),
    ];
    const { newTags, edited } = deleteTagFromTags(tags[0], tags);

    expect(newTags).toEqual([tags[1], tags[2], tags[3]]);
    expect(edited.hasOwnProperty("title")).toBe(true);
    expect(edited.title).toBeUndefined();
  });
});
