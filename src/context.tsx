import * as React from "react";
import { validUrl } from "./utils";
import { MetaTag } from "./types";
import { getValueProp, createCustomUrl } from "./tags";
import * as api from "./api";

export type Results =
  | {
      type: "success";
      tags: MetaTag[];
      customUrl: string;
    }
  | {
      type: "loading";
    }
  | {
      type: "error";
      message: string;
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

const startingUrl = "https://tagtester.dev";

export const OGProvider: React.FC = props => {
  const [state, setState] = React.useState<State>({
    url: startingUrl,
    results: { type: "loading" },
    isUrlError: null,
  });

  const editedTagsRef = React.useRef(new Map<string, string>());

  const fetchTags = async () => {
    if (state.isUrlError || state.url === "") {
      return;
    }

    setState({
      ...state,
      results: {
        type: "loading",
      },
    });
    editedTagsRef.current.clear();

    try {
      const tagResult = await api.fetchTags(state.url);
      setState({
        ...state,
        results: {
          type: "success",
          customUrl: createCustomUrl(state.url, editedTagsRef.current),
          tags: tagResult.tags,
        },
      });
    } catch (e) {
      setState({
        ...state,
        results: {
          type: "error",
          message: e.message ?? "There was an error",
        },
      });
    }
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

  React.useEffect(() => {
    if (state.results.type !== "success") {
      fetchTags();
    }
  }, []);

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
