import { NextApiRequest, NextApiResponse } from "next";
import { getMetadata } from "../../server/metadata";
import { generateTagPage, createPage } from "../../server/template";
import { MetaTag } from "../../types";
import { ogPrefix, twitterPrefix } from "../../tags";
import { validUrl } from "../../utils";

const getNameProp = (k: string): string => {
  if (k.startsWith(ogPrefix)) {
    return "property";
  }

  return "name";
};

const getValueProp = (k: string): string => {
  if (k.startsWith(twitterPrefix)) {
    return "value";
  }

  return "content";
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, ...rest } = req.query;

  try {
    if (!validUrl(url)) {
      throw new Error("Invalid Url");
    }

    const tags: MetaTag[] = [];

    const deletedTags: Set<string> = new Set(
      Object.keys(rest).filter(k => rest[k] === "undefined"),
    );

    tags.push(
      ...Object.keys(rest)
        .filter(k => rest[k] !== "undefined")
        .map(k => ({
          [getNameProp(k)]: k,
          [getValueProp(k)]: rest[k],
        })),
    );

    const tagNames: Set<string> = new Set(Object.keys(rest));

    tags.push(
      ...(await getMetadata(url as string)).filter(
        t =>
          !tagNames.has(t.name) &&
          !tagNames.has(t.property) &&
          !deletedTags.has(t.name ?? t.property),
      ),
    );

    const page = generateTagPage(url as string, tags, Object.keys(rest));

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(page);
  } catch (e) {
    const errorPage = createPage(
      "",
      `
<h1>${e.message}</h1>

<a href="https://tagtester.dev">Go back to Tag Tester</a>
`,
    );
    res.setHeader("Content-Type", "text/html");
    res.status(400).send(errorPage);
  }
};
