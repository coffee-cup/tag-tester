export type MetaCategory = "html" | "opengraph" | "twitter";

export interface MetaTag {
  name?: string;
  property?: string;
  category: MetaCategory;
  content?: string;
}
