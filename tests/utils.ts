import { ogPrefix, twitterPrefix } from "../src/tags";
import { MetaTag } from "../src/types";

export const makeTag = (
  name: string,
  content: string | undefined,
): MetaTag => ({
  [name.startsWith(ogPrefix) ? "property" : "name"]: name,
  [name.startsWith(twitterPrefix) ? "value" : "content"]: content,
});
