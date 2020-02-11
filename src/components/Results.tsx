import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import { isImageTag } from "../tags";
import { MetaTag } from "../types";
import { Edit2, Check } from "react-feather";
import Input from "./Input";
import Loading from "./Loading";

const StyledResults = styled.div(
  css({
    px: [0, 0, 4],
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

const TagName = styled.div(
  css({
    fontWeight: "bold",
  }),
);

const TagValue = styled.div(
  css({
    position: "relative",
  }),
);

const StyledTagRow = styled.div<{ highlight: boolean }>(props =>
  css({
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "140px 1fr",
    bg: props.highlight ? "transparent" : "muted",
    p: 2,
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
            {!showImage
              ? tag.content ?? tag.value
              : (tag.name ?? tag.property) === "og:image" && (
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

const Tags = () => {
  const { results } = useOG();

  if (results.type !== "success") {
    return null;
  }

  return (
    <StyledTags>
      <h3>Tags</h3>

      {results.tags.map((tag, i) => (
        <TagRow key={i} tag={tag} highlight={i % 2 === 0} />
      ))}
    </StyledTags>
  );
};

const Results = () => {
  const { results } = useOG();

  if (results.type !== "success") {
    return <Loading />;
  }

  return (
    <StyledResults>
      <Tags />
    </StyledResults>
  );
};

export default Results;
