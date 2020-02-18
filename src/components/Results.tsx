import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Link from "next/link";
import { useOG } from "../context";
import { isImageTag } from "../tags";
import { MetaTag } from "../types";
import { Edit2, Check } from "react-feather";
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
    maxWidth: "100%",
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
    minWidth: ["6rem", "8rem"],
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
    right: 2,
    height: "100%",
    color: "grey",
    cursor: "pointer",
    opacity: props.show ? "1" : "0",

    transition: "opacity 250ms ease-in-out",
  }),
);

const TagInput = styled(Input)(
  css({
    width: "100%",
    py: 2,
    pr: 4,
    border: "solid 1px",
    borderColor: "primary",
  }),
);

const TagRow: React.FC<{ tag: MetaTag; highlight: boolean }> = ({
  tag,
  highlight,
}) => {
  const { editTag } = useOG();

  const [showEdit, setShowEdit] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedValue, setEditedValue] = React.useState(
    tag.content ?? tag.value,
  );
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
    setEditedValue(tag.content ?? tag.value);
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
      startEditing();
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
      <TagName className="tag-name">{tag.name ?? tag.property}</TagName>
      <TagValue className="tag-value">
        <IconContainer show={showEdit} onClick={() => iconClick()}>
          {isEditing ? <Check size="16px" /> : <Edit2 size="14px" />}
        </IconContainer>

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
              tag.content ?? tag.value
            ) : (
              <a href={tag.content ?? tag.value}>
                <TableImage alt="" src={tag.content ?? tag.value} />
              </a>
            )}
          </>
        )}
      </TagValue>
    </StyledTagRow>
  );
};

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

const Tags = () => {
  const { results, settings } = useOG();

  if (results.type !== "success") {
    return null;
  }

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
            {results.filteredTags.map((tag, i) => (
              <TagRow key={i} tag={tag} highlight={i % 2 === 0} />
            ))}
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
