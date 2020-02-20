import * as React from "react";
import { validUrl } from "./utils";
import { FilterType, MetaTag, TagResult, Settings } from "./types";
import {
  createCustomUrl,
  createNewTag,
  editTagFromTags,
  deleteTagFromTags,
} from "./tags";
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
  settings: Settings;
  edited: { [key: string]: string | undefined };
}

export interface Actions {
  setUrl: (value: string) => void;
  fetchTags: () => void;
  addTag: (name: string, content: string) => void;
  deleteTag: (tag: MetaTag) => void;
  editTag: (tag: MetaTag, value: string) => void;
  updateSettings: (newSettings: Settings) => void;
}

const initSettings: Settings = {
  onlyShowRecommended: true,
  syncSimilarTags: true,
  filters: [FilterType.Html, FilterType.OpenGraph, FilterType.Twitter],
};

const OGContext = React.createContext<State & Actions>({} as State & Actions);

export const useOG = (): State & Actions => {
  const state = React.useContext(OGContext);
  return state;
};

const getResults = (
  tagResult?: TagResult,
  error?: string,
  editedTags: { [key: string]: string } = {},
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

const useUrlChange = (urlChanged: (url: string) => void) => {
  React.useEffect(() => {
    const handleRouteChange = (path: string) => {
      const url = parseUrlFromPath(path);

      if (url != null) {
        urlChanged(url);
      }
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
};

export const OGProvider: React.FC<{
  tagResult?: TagResult;
  error?: { message: string };
  url?: string;
}> = props => {
  const getState = (): State => ({
    url: props.tagResult?.url ?? props.url ?? props.error?.message ?? "",
    results: getResults(props.tagResult, props.error?.message),
    isUrlError:
      props.tagResult != null &&
      props.tagResult.url !== "" &&
      !validUrl(props.tagResult.url),
    settings: initSettings,
    edited: {},
  });

  const [state, setState] = React.useState<State>(getState());

  useUrlChange(url => {
    setState({
      ...state,
      url,
      edited: {},
      results: {
        type: "loading",
      },
    });
  });

  React.useEffect(() => {
    setState(getState());
  }, [props.tagResult, props.error]);

  const fetchTags = async () => {
    if (state.url == null || state.url === "") {
      setState({
        ...state,
        results: {
          type: "not-fetched",
        },
      });

      Router.push("/");
      return;
    }

    setState({
      ...state,
      edited: {},
      results: {
        type: "loading",
      },
    });

    Router.push(`/?url=${encodeURIComponent(state.url)}`);
  };

  const updateTags = (
    newTags: MetaTag[],
    edited: { [key: string]: string | undefined },
  ) => {
    if (state.results.type !== "success") {
      return;
    }

    const newEdited: { [key: string]: string | undefined } = {
      ...state.edited,
      ...edited,
    };

    setState({
      ...state,
      edited: newEdited,
      results: {
        ...state.results,
        tags: newTags,
        customUrl: createCustomUrl(state.url, newEdited),
      },
    });
  };

  const deleteTag = (tag: MetaTag) => {
    if (state.results.type !== "success") {
      return;
    }

    const { newTags, edited } = deleteTagFromTags(tag, state.results.tags);
    updateTags(newTags, edited);
  };

  const addTag = (name: string, content: string) => {
    if (state.results.type !== "success") {
      return;
    }

    const { newTags, edited } = createNewTag(name, content, state.results.tags);
    updateTags(newTags, edited);
  };

  const editTag = (tag: MetaTag, value: string) => {
    if (state.results.type !== "success") {
      return;
    }

    const { newTags, edited } = editTagFromTags(
      tag.name ?? tag.property,
      value,
      state.results.tags,
      state.settings.syncSimilarTags,
    );
    updateTags(newTags, edited);
  };

  const updateSettings = (newSettings: Settings) => {
    setState({
      ...state,
      settings: newSettings,
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
    addTag,
    deleteTag,
    editTag,
    updateSettings,
  };

  const value: State & Actions = {
    ...state,
    ...actions,
  };

  return (
    <OGContext.Provider value={value}>{props.children}</OGContext.Provider>
  );
};
