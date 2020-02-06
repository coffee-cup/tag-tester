import * as React from "react";
import { validUrl } from "./utils";
import { Results } from "./types";

export interface OGState {
  url: string;
  isUrlError: boolean;
  error: string;
  setUrl: (value: string) => void;
  fetchTags: () => void;
  results: Results | null;
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

  const [results, setResults] = React.useState<Results | null>(null);

  const fetchTags = async () => {
    if (isUrlError || url === "") {
      return;
    }

    const query = `page=${encodeURIComponent(url)}`;
    const json = await fetch(`/api/html?${query}`).then(res => res.json());

    if (json.error != null) {
      setError(json.error);
    } else {
      setResults(json);
      setError(null);
    }
  };

  React.useEffect(() => {
    if (results == null) {
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
    results,
  };

  return (
    <OGContext.Provider value={value}>{props.children}</OGContext.Provider>
  );
};
