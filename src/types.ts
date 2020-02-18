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

export enum FilterType {
  Html,
  OpenGraph,
  Twitter,
}

export interface Settings {
  onlyShowRecommended: boolean;
  syncSimilarTags: boolean;
  filters: FilterType[];
}
