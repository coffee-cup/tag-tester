import { TagResult } from "./types";
import fetch from "isomorphic-unfetch";

export const fetchTags = async (path: string): Promise<TagResult> => {
  const baseUrl = process.env.API_URL ?? "http://localhost:3000";
  const query = `page=${encodeURIComponent(path)}`;
  const url = `${baseUrl}/api/html?${query}`;

  const res = await fetch(url);
  if (res.status !== 200) {
    const e = await res.json();
    throw new Error(e.error);
  }

  const json = await res.json();
  return json as TagResult;
};
