import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Link from "next/link";
import { useOG } from "../context";
import { isImageTag, getFilteredTags, getName, getValue } from "../tags";
import { MetaTag } from "../types";
import { Trash, Check } from "react-feather";
import Input from "./Input";
import Loading from "./Loading";
import Error from "./Error";
import Settings from "./Settings";

const StyledResults = styled.div(
  css({
    px: [0, 0, 2],
    py: [2, 2, 4],
  }),
);

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
    pr: 4,
  }),
);

const TagHeader = styled.div(
  css({
    mb: 2,
  }),
);

const TagTitle = styled.h3(
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
    transform: "translateX(100%)",

    transition: "opacity 250ms ease-in-out",
  }),
);

const TagInput = styled(Input)<{ isError?: boolean }>(props =>
  css({
    width: "100%",
    py: 2,
    pr: 4,
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

  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState("");

  const nameExists = React.useMemo(() => {
    if (results.type !== "success") {
      return false;
    }

    return results.tags.find(t => getName(t) === name) != null;
  }, [name, results]);

  const createRow = () => {
    if (!nameExists) {
      addTag(name, value);

      setIsEditing(false);
      setName("");
      setValue("");
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
            <TagInput
              autoFocus
              isError={nameExists}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="tag name"
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
          <TagInput
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="tag value"
          />
        ) : (
          <NewRowText>create row</NewRowText>
        )}
      </TagValue>
    </StyledTagRow>
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
    <StyledTags>
      <TagHeader>
        <TagTitle>Tags</TagTitle>
        <Settings />
      </TagHeader>

      {settings.filters.length === 0 ? (
        <p>No filters selected</p>
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
  );
};

const NotFetched = () => (
  <div>
    <h3>No tags fetched yet</h3>

    <p>Enter a url above or try with one of these examples</p>

    <ul>
      <li>
        <Link href={`/?url=${encodeURIComponent("https://tagtester.dev")}`}>
          <a>tagtester.dev</a>
        </Link>
      </li>
      <li>
        <Link href={`/?url=${encodeURIComponent("https://github.com")}`}>
          <a>github.com</a>
        </Link>
      </li>
      <li>
        <Link href={`/?url=${encodeURIComponent("https://zeit.co")}`}>
          <a>zeit.co</a>
        </Link>
      </li>
    </ul>
  </div>
);

const Results = () => {
  const { results } = useOG();

  return (
    <StyledResults className="results">
      {results.type === "loading" ? (
        <Loading />
      ) : results.type === "not-fetched" ? (
        <NotFetched />
      ) : results.type === "error" ? (
        <Error error={results.message} />
      ) : (
        <Tags />
      )}
    </StyledResults>
  );
};

export default Results;
