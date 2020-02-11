import { NextApiRequest, NextApiResponse } from "next";
import { getMetadata } from "../../server/metadata";
import { validUrl } from "../../utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;

  try {
    if (!validUrl(page)) {
      throw new Error("Invalid Url");
    }

    const tags = await getMetadata(page as string);

    res.status(200).json({ url: page, tags });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
