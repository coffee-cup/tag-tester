import * as React from "react";
import { validUrl } from "./utils";
import { MetaTag } from "./types";

export interface OGState {
  url: string;
  isUrlError: boolean;
  setUrl: (value: string) => void;
  fetchTags: () => void;
  tags: MetaTag[] | null;
}

const OGContext = React.createContext<OGState>({} as OGState);

export const useOG = (): OGState => {
  const state = React.useContext(OGContext);
  return state;
};

export const OGProvider: React.FC = props => {
  const [url, setUrl] = React.useState("https://jakerunzer.com");
  const [isUrlError, setIsUrlError] = React.useState(false);

  const [tags, setTags] = React.useState<MetaTag[] | null>(null);

  const fetchTags = async () => {
    if (isUrlError) {
      return;
    }

    const query = `page=${encodeURIComponent(url)}`;
    const { tags } = await fetch(`/api/html?${query}`).then(res => res.json());

    setTags(tags);
  };

  const value: OGState = {
    url,
    isUrlError,
    setUrl: value => {
      setUrl(value);
      setIsUrlError(url !== "" && !validUrl(url));
    },
    fetchTags,
    tags,
  };

  return (
    <OGContext.Provider value={value}>{props.children}</OGContext.Provider>
  );
};
