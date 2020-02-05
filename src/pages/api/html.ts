import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const { page } = req.query;

  if (page == null || typeof page !== "string") {
    res.status(400).json({ error: "Invalid apge" });
  }

  const html = await fetch(page as string).then(res => res.text());

  res.status(200).json({ url: page, html });
};
