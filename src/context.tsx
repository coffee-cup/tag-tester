import * as React from "react";
import { validUrl } from "./utils";
import { MetaTag, TagResult } from "./types";
import { getValueProp, createCustomUrl } from "./tags";
import Router from "next/router";

export type Results =
  | {
      type: "success";
      tags: MetaTag[];
      customUrl: string;
    }
  | {
      type: "error";
      message: string;
    }
  | {
      type: "loading";
    }
  | {
      type: "not-fetched";
    };

export interface State {
  url: string;
  isUrlError: boolean;
  results: Results;
}

export interface Actions {
  setUrl: (value: string) => void;
  fetchTags: () => void;
  editTag: (tag: MetaTag, value: string) => void;
}

const OGContext = React.createContext<State & Actions>({} as State & Actions);

export const useOG = (): State & Actions => {
  const state = React.useContext(OGContext);
  return state;
};

const getResults = (
  tagResult?: TagResult,
  error?: string,
  editedTags: Map<string, string> = new Map(),
): Results => {
  if (tagResult != null) {
    return {
      type: "success",
      customUrl: createCustomUrl(tagResult.url, editedTags),
      tags: tagResult.tags,
    };
  } else if (error != null) {
    return {
      type: "error",
      message: error,
    };
  }

  return {
    type: "not-fetched",
  };
};

const urlRegex = /\?url=(.+)/;
const parseUrlFromPath = (url: string): string | null => {
  const match = url.match(urlRegex);
  if (match == null || match.length !== 2) {
    return null;
  }

  return decodeURIComponent(match[1]);
};

export const OGProvider: React.FC<{
  tagResult?: TagResult;
  error?: string;
  url?: string;
}> = props => {
  const getState = (): State => ({
    url: props.tagResult?.url ?? props.url ?? props.error ?? "",
    results: getResults(props.tagResult, props.error),
    isUrlError:
      props.tagResult != null &&
      props.tagResult.url !== "" &&
      !validUrl(props.tagResult.url),
  });

  const [state, setState] = React.useState<State>(getState());

  React.useEffect(() => {
    setState(getState());
  }, [props.tagResult, props.error]);

  React.useEffect(() => {
    const handleRouteChange = (path: string) => {
      const url = parseUrlFromPath(path);

      if (url != null) {
        setState({
          ...state,
          url,
          results: {
            type: "loading",
          },
        });
      }
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const editedTagsRef = React.useRef(new Map<string, string>());

  const fetchTags = async () => {
    if (state.url == null || state.url === "") {
      setState({
        ...state,
        results: {
          type: "not-fetched",
        },
      });

      return;
    }

    setState({
      ...state,
      results: {
        type: "loading",
      },
    });
    editedTagsRef.current.clear();

    Router.push(`/?url=${encodeURIComponent(state.url)}`);
  };

  const editTag = (tag: MetaTag, value: string) => {
    if (state.results.type !== "success") {
      return;
    }

    const newTags = state.results.tags.map(t => {
      if (t != tag) {
        return t;
      }

      return {
        ...t,
        [getValueProp(t)]: value,
      };
    });

    editedTagsRef.current.set(tag.name ?? tag.property, value);

    setState({
      ...state,
      results: {
        ...state.results,
        tags: newTags,
        customUrl: createCustomUrl(state.url, editedTagsRef.current),
      },
    });
  };

  const actions: Actions = {
    setUrl: value => {
      setState({
        ...state,
        url: value,
        isUrlError: value !== "" && !validUrl(value),
      });
    },
    fetchTags,
    editTag,
  };

  const value: State & Actions = {
    ...state,
    ...actions,
  };

  return (
    <OGContext.Provider value={value}>{props.children}</OGContext.Provider>
  );
};
