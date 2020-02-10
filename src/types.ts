export interface MetaTag {
  name?: string;
  property?: string;
  content?: string;
  value?: string;
}

export interface TagResult {
  url: string;
  tags: MetaTag[];
}
