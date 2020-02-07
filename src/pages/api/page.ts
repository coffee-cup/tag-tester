import { NextApiRequest, NextApiResponse } from "next";
import { getMetadata } from "../../server/metadata";
import { generatePage } from "../../server/template";
import { MetaTag } from "../../types";
import { ogPrefix, twitterPrefix } from "../../tags";

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

  const tags: MetaTag[] = [];

  tags.push(
    ...Object.keys(rest).map(k => ({
      [getNameProp(k)]: k,
      [getValueProp(k)]: rest[k],
    })),
  );

  const tagNames: Set<string> = new Set(Object.keys(rest));

  try {
    if (url != null && typeof url === "string") {
      tags.push(
        ...(await getMetadata(url as string)).filter(
          t => !tagNames.has(t.name) && !tagNames.has(t.property),
        ),
      );
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }

  console.log(tags);

  const page = generatePage(tags);

  res.setHeader("Content-Type", "text/html");

  res.status(200).send(page);
};
