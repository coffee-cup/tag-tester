export interface MetaTag {
  name?: string;
  property?: string;
  content?: string;
  value?: string;
}

export interface Results {
  url: string;
  tags: MetaTag[];
}
