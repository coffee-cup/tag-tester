/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import { Check, Trash } from "react-feather";
import { Box, jsx, Styled } from "theme-ui";
import { useOG } from "../context";
import {
  getFilteredTags,
  getName,
  getValue,
  isImageTag,
  generateTagHtml,
} from "../tags";
import { MetaTag } from "../types";
import Error from "./Error";
import Input from "./Input";
import Loading from "./Loading";
import Settings from "./Settings";
import Examples from "./Examples";

const TableImage = styled.img(
  css({
    display: "block",
    width: "100%",
    maxWidth: "20rem",
  }),
);

const StyledTags = styled.div(
  css({
    pb: 4,
  }),
);

const TagName = styled.td(
  css({
    fontWeight: "bold",
    wordBreak: "break-all",
    minWidth: ["8rem", "12rem"],
    p: 2,
  }),
);

const TagValue = styled.td(
  css({
    position: "relative",
    wordBreak: "break-all",
    p: 2,
  }),
);

const Table = styled.table(
  css({
    width: "100%",
    pr: [0, 4],
  }),
);

const TagHeader = styled.div(
  css({
    mb: 2,
  }),
);

const StyledTagRow = styled.tr<{ highlight: boolean }>(props =>
  css({
    bg: props.highlight ? "transparent" : "muted",
    cursor: "pointer",
  }),
);

const IconContainer = styled.div<{ show: boolean }>(props =>
  css({
    position: "absolute",
    display: "flex",
    alignItems: "center",
    top: 0,
    right: 0,
    pl: 2,
    height: "100%",
    color: "grey",
    cursor: "pointer",
    opacity: props.show ? "1" : "0",
    transform: ["initial", "translateX(100%)"],

    transition: "opacity 250ms ease-in-out",
  }),
);

const TagInput = styled(Input)<{ isError?: boolean }>(props =>
  css({
    width: "100%",
    py: 2,
    pr: [0, 4],
    border: "solid 1px",
    borderColor: props.isError ? "error" : "primary",
  }),
);

const NewRowText = styled.span(
  css({
    color: "grey.500",
  }),
);

const ErrorText = styled.span(
  css({
    color: "error",
    fontSize: 1,
    fontWeight: "normal",
  }),
);

const TagRow: React.FC<{ tag: MetaTag; highlight: boolean }> = ({
  tag,
  highlight,
}) => {
  const { editTag, deleteTag } = useOG();

  const [showEdit, setShowEdit] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedValue, setEditedValue] = React.useState(getValue(tag));
  const inputRef = React.useRef<HTMLInputElement>();

  const showImage = isImageTag(tag) && !isEditing;

  const finishEditing = () => {
    editTag(tag, editedValue);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  React.useEffect(() => {
    setEditedValue(getValue(tag));
  }, [tag.content, tag.value]);

  React.useEffect(() => {
    if (inputRef.current != null) {
      const handler = () => {
        finishEditing();
      };

      inputRef.current.addEventListener("blur", handler);
      return () => {
        if (inputRef.current != null) {
          inputRef.current.removeEventListener("blue", handler);
        }
      };
    }
  }, [inputRef.current]);

  const iconClick = () => {
    if (isEditing) {
      finishEditing();
    } else {
      deleteTag(tag);
    }
  };

  return (
    <StyledTagRow
      className="tag-row"
      highlight={highlight}
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
      onClick={() => {
        if (!isEditing) {
          startEditing();
        }
      }}
    >
      <TagName className="tag-name">{getName(tag)}</TagName>
      <TagValue className="tag-value">
        <IconContainer
          show={showEdit}
          onClick={e => {
            iconClick();
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {isEditing ? <Check size="16px" /> : <Trash size="14px" />}
        </IconContainer>{" "}
        {isEditing ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              finishEditing();
            }}
          >
            <TagInput
              autoFocus
              ref={inputRef}
              value={editedValue}
              onChange={e => setEditedValue(e.target.value)}
            />
          </form>
        ) : (
          <>
            {!showImage ? (
              getValue(tag)
            ) : (
              <a href={getValue(tag)}>
                <TableImage alt="" src={getValue(tag)} />
              </a>
            )}
          </>
        )}
      </TagValue>
    </StyledTagRow>
  );
};

const AddRow: React.FC<{ highlight: boolean }> = props => {
  const { results, addTag } = useOG();

  const [isEditing, setIsEditing] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState("");

  const nameExists = React.useMemo(() => {
    if (results.type !== "success") {
      return false;
    }

    return results.tags.find(t => getName(t) === name) != null;
  }, [name, results]);

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const createRow = () => {
    if (name === "" || value === "") {
      setShowError(true);
      return;
    }

    if (!nameExists && name !== "" && value !== "") {
      addTag(name, value);

      setIsEditing(false);
      setName("");
      setValue("");
      setShowError(false);
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      createRow();
    } else if (e.keyCode === 27) {
      cancelEditing();
    }
  };

  return (
    <StyledTagRow
      highlight={props.highlight}
      onClick={() => {
        setIsEditing(true);
      }}
    >
      <TagName className="tag-name-add">
        {isEditing ? (
          <>
            {nameExists && <ErrorText>tag already exists</ErrorText>}
            {showError && name === "" && (
              <ErrorText>name cannot be empty</ErrorText>
            )}
            <TagInput
              autoFocus
              isError={nameExists}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="tag name"
              onKeyUp={onKeyUp}
            />
          </>
        ) : (
          <NewRowText>Click to</NewRowText>
        )}
      </TagName>

      <TagValue className="tag-value-add">
        <IconContainer
          show={isEditing}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            createRow();
          }}
        >
          {isEditing ? <Check size="16px" /> : <Trash size="14px" />}
        </IconContainer>

        {isEditing ? (
          <>
            {showError && value === "" && (
              <ErrorText>value cannot be empty</ErrorText>
            )}
            <TagInput
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="tag value"
              onKeyUp={onKeyUp}
            />
          </>
        ) : (
          <NewRowText>create row</NewRowText>
        )}
      </TagValue>
    </StyledTagRow>
  );
};

const RawHtml = () => {
  const { results } = useOG();

  const [show, setShow] = React.useState(false);

  const html = React.useMemo(() => {
    if (results.type !== "success") {
      return "";
    }

    return generateTagHtml(results.tags);
  }, [results]);

  if (html === "") {
    return null;
  }

  return (
    <Box
      sx={{
        pr: 4,
      }}
    >
      <span
        sx={{
          cursor: "pointer",
          textDecoration: "underline",
          transition: "all 150ms ease-in-out",
          display: "inline-block",
          mb: 2,
          "&:hover": {
            bg: "primary",
            color: "white",
          },
        }}
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "hide raw html" : "show raw html"}
      </span>

      {show && (
        <Box
          sx={{
            bg: "muted",
            p: 2,
            borderRadius: "2px",
            overflowX: "auto",
          }}
        >
          <pre>{html}</pre>
        </Box>
      )}
    </Box>
  );
};

const Tags = () => {
  const { results, settings } = useOG();

  if (results.type !== "success") {
    return null;
  }

  const filteredTags = getFilteredTags(
    results.tags,
    settings.filters,
    settings.onlyShowRecommended,
  );

  return (
    <>
      <StyledTags>
        <TagHeader>
          <Styled.h2>Tags</Styled.h2>
          <Settings />

          {settings.filters.length !== 0 && (
            <p>
              <i>Edit tags by clicking on them</i>
            </p>
          )}
        </TagHeader>

        {settings.filters.length === 0 ? (
          <Styled.p>No filters selected</Styled.p>
        ) : (
          <Table>
            <tbody>
              {filteredTags.map((tag, i) => (
                <TagRow key={i} tag={tag} highlight={i % 2 === 0} />
              ))}

              <AddRow highlight={filteredTags.length % 2 === 0} />
            </tbody>
          </Table>
        )}
      </StyledTags>

      <RawHtml />
    </>
  );
};

const NotFetched = () => (
  <Box>
    <Styled.h2>No tags fetched yet</Styled.h2>

    <Examples />
  </Box>
);

const Results = () => {
  const { results } = useOG();

  return (
    <Box className="results">
      {results.type === "loading" ? (
        <Loading />
      ) : results.type === "not-fetched" ? (
        <NotFetched />
      ) : results.type === "error" ? (
        <Error error={results.message} />
      ) : (
        <Tags />
      )}
    </Box>
  );
};

export default Results;
