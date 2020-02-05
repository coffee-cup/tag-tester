import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { getMetadata } from "../../server/metadata";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;

  if (page == null || typeof page !== "string") {
    res.status(400).json({ error: "Invalid apge" });
  }

  try {
    const html = await fetch(page as string).then(res => res.text());
    const tags = getMetadata(html);

    res.status(200).json({ url: page, tags });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
