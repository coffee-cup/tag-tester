import { TagResult } from "./types";

export const fetchTags = async (url: string): Promise<TagResult> => {
  const query = `page=${encodeURIComponent(url)}`;

  const res = await fetch(`/api/html?${query}`);
  if (res.status !== 200) {
    const e = await res.json();
    throw new Error(e.message);
  }

  const json = await res.json();
  return json as TagResult;
};
