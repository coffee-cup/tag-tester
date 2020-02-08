import * as React from "react";
import { validUrl } from "./utils";
import { Results, MetaTag } from "./types";
import { getValueProp, createCustomUrl } from "./tags";

export interface OGState {
  url: string;
  isUrlError: boolean;
  error: string;
  results: Results | null;
  customUrl: string | null;
  setUrl: (value: string) => void;
  fetchTags: () => void;
  editTag: (tag: MetaTag, value: string) => void;
}

const OGContext = React.createContext<OGState>({} as OGState);

export const useOG = (): OGState => {
  const state = React.useContext(OGContext);
  return state;
};

export const OGProvider: React.FC = props => {
  const [url, setUrl] = React.useState("https://alfie.prodo.ai/plucky-cabbage");
  const [error, setError] = React.useState<string | null>(null);
  const [isUrlError, setIsUrlError] = React.useState(false);
  const [results, setResults] = React.useState<Results | null>(null);
  const [customUrl, setCustomUrl] = React.useState<string | null>(null);

  const editedTagsRef = React.useRef(new Map<string, string>());

  const fetchTags = async () => {
    if (isUrlError || url === "") {
      return;
    }

    setResults(null);
    setCustomUrl(null);
    editedTagsRef.current.clear();

    const query = `page=${encodeURIComponent(url)}`;
    const json = await fetch(`/api/html?${query}`).then(res => res.json());

    if (json.error != null) {
      setError(json.error);
    } else {
      setResults(json);
      setError(null);
    }
  };

  const editTag = (tag: MetaTag, value: string) => {
    const newTags = results.tags.map(t => {
      if (t != tag) {
        return t;
      }

      return {
        ...t,
        [getValueProp(t)]: value,
      };
    });

    setResults({
      ...results,
      tags: newTags,
    });

    editedTagsRef.current.set(tag.name ?? tag.property, value);
    setCustomUrl(createCustomUrl(results.url, editedTagsRef.current));
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
    results,
    customUrl,
    setUrl: value => {
      setUrl(value);
      setIsUrlError(value !== "" && !validUrl(value));
    },
    fetchTags,
    editTag,
  };

  return (
    <OGContext.Provider value={value}>{props.children}</OGContext.Provider>
  );
};
