import * as htmlparser2 from "htmlparser2";
import { MetaTag, MetaCategory } from "../types";
import { htmlTags, twitterTags, isImportantTag } from "../tags";

export const getMetadata = (html: string): MetaTag[] => {
  const tags: MetaTag[] = [];

  const htmlParser = new htmlparser2.Parser({
    onopentag(name, attribs) {
      if (name === "meta") {
        const { name, property, content } = attribs;

        if (isImportantTag(name, property)) {
          let category: MetaCategory = htmlTags.includes(name ?? property)
            ? "html"
            : twitterTags.includes(name ?? property)
            ? "twitter"
            : "opengraph";

          tags.push({
            name,
            property,
            category,
            content,
          });
        }
      }
    },
  });

  htmlParser.write(html);
  htmlParser.end();

  return tags;
};
