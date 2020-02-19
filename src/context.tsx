import * as React from "react";
import { validUrl } from "./utils";
import { FilterType, MetaTag, TagResult, Settings } from "./types";
import { createCustomUrl, getFilteredTags, editAllTags } from "./tags";
import Router from "next/router";

export type Results =
  | {
      type: "success";
      tags: MetaTag[];
      filteredTags: MetaTag[];
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
}

export interface Actions {
  setUrl: (value: string) => void;
  fetchTags: () => void;
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
  settings: Settings,
  tagResult?: TagResult,
  error?: string,
  editedTags: { [key: string]: string } = {},
): Results => {
  if (tagResult != null) {
    return {
      type: "success",
      customUrl: createCustomUrl(tagResult.url, editedTags),
      tags: tagResult.tags,
      filteredTags: getFilteredTags(
        tagResult.tags,
        settings.filters,
        settings.onlyShowRecommended,
      ),
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
    results: getResults(initSettings, props.tagResult, props.error),
    isUrlError:
      props.tagResult != null &&
      props.tagResult.url !== "" &&
      !validUrl(props.tagResult.url),
    settings: initSettings,
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

  const editedTagsRef = React.useRef<{ [key: string]: string }>({});

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
    editedTagsRef.current = {};

    Router.push(`/?url=${encodeURIComponent(state.url)}`);
  };

  const deleteTag = (tag: MetaTag) => {
    if (state.results.type !== "success") {
      return;
    }

    const newTags = state.results.tags.filter(t => t !== tag);
    setState({
      ...state,
      results: {
        ...state.results,
        tags: newTags,
        filteredTags: getFilteredTags(
          newTags,
          state.settings.filters,
          state.settings.onlyShowRecommended,
        ),
      },
    });
  };

  const editTag = (tag: MetaTag, value: string) => {
    if (state.results.type !== "success") {
      return;
    }

    const { newTags, edited } = editAllTags(
      tag.name ?? tag.property,
      value,
      state.results.tags,
      state.settings.syncSimilarTags,
    );

    editedTagsRef.current = {
      ...editedTagsRef.current,
      ...edited,
    };

    setState({
      ...state,
      results: {
        ...state.results,
        tags: newTags,
        filteredTags: getFilteredTags(
          newTags,
          state.settings.filters,
          state.settings.onlyShowRecommended,
        ),
        customUrl: createCustomUrl(state.url, editedTagsRef.current),
      },
    });
  };

  const updateSettings = (newSettings: Settings) => {
    setState({
      ...state,
      results:
        state.results.type === "success"
          ? {
              ...state.results,
              filteredTags: getFilteredTags(
                state.results.tags,
                newSettings.filters,
                newSettings.onlyShowRecommended,
              ),
            }
          : state.results,
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
