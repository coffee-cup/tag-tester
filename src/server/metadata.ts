import * as htmlparser2 from "htmlparser2";
import { MetaTag } from "../types";
import fetch from "node-fetch";
import { prefixUrl } from "../utils";

export const parseTags = (html: string): MetaTag[] => {
  const tags: MetaTag[] = [];

  let readingTitle = false;
  let inHead = false;

  const htmlParser = new htmlparser2.Parser({
    onopentag(name, attribs) {
      if (name === "meta") {
        const { name, property, content, value } = attribs;

        if (name || property) {
          tags.push({ name, property, content, value });
        }
      } else if (name === "title" && inHead) {
        readingTitle = true;
      } else if (name === "head") {
        inHead = true;
      }
    },
    ontext(text) {
      if (readingTitle) {
        tags.push({ name: "title", content: text });
      }
    },
    onclosetag(name) {
      if (name === "title") {
        readingTitle = false;
      } else if (name === "head") {
        inHead = false;
      }
    },
  });

  htmlParser.write(html);
  htmlParser.end();

  return tags;
};

export const getMetadata = async (page: string): Promise<MetaTag[]> => {
  const html = await fetch(prefixUrl(page)).then(res => res.text());

  const tags = parseTags(html);

  return tags;
};
