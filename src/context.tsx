import * as React from "react";
import { validUrl } from "./utils";
import { MetaTag } from "./types";

export interface OGState {
  url: string;
  isUrlError: boolean;
  error: string;
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
  const [url, setUrl] = React.useState("https://alfie.prodo.ai");
  const [error, setError] = React.useState<string | null>(null);
  const [isUrlError, setIsUrlError] = React.useState(false);

  const [tags, setTags] = React.useState<MetaTag[] | null>(null);

  const fetchTags = async () => {
    if (isUrlError || url === "") {
      return;
    }

    const query = `page=${encodeURIComponent(url)}`;
    const json = await fetch(`/api/html?${query}`).then(res => res.json());

    if (json.error != null) {
      setError(json.error);
    } else {
      setTags(json.tags);
      setError(null);
    }
  };

  React.useEffect(() => {
    if (tags == null) {
      fetchTags();
    }
  }, []);

  const value: OGState = {
    url,
    isUrlError,
    error,
    setUrl: value => {
      setUrl(value);
      setIsUrlError(value !== "" && !validUrl(value));
    },
    fetchTags,
    tags,
  };

  return (
    <OGContext.Provider value={value}>{props.children}</OGContext.Provider>
  );
};
