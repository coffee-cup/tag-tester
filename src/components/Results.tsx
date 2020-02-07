import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import Section from "./Section";
import { isTwitterTag, isOGTag, isImageTag } from "../tags";
import { MetaTag } from "../types";

const StyledResults = styled.div(
  css({
    my: 2,
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

const TagValue = styled.div(css({}));

const StyledTagRow = styled.div<{ highlight: boolean }>(props =>
  css({
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    bg: props.highlight ? "transparent" : "muted",
    p: 2,
  }),
);

const TagRow: React.FC<{ tag: MetaTag; highlight: boolean }> = ({
  tag,
  highlight,
}) => {
  const isImage = isImageTag(tag);

  return (
    <StyledTagRow highlight={highlight}>
      <TagName>{tag.name ?? tag.property}</TagName>
      <TagValue>
        {!isImage
          ? tag.content ?? tag.value
          : (tag.name ?? tag.property) === "og:image" && (
              <a href={tag.content ?? tag.value}>
                <TableImage alt="" src={tag.content ?? tag.value} />
              </a>
            )}
      </TagValue>
    </StyledTagRow>
  );
};

const Tags = () => {
  const { results } = useOG();
  const { tags } = results;

  return (
    <Section>
      <StyledTags>
        {tags.map((tag, i) => (
          <TagRow key={i} tag={tag} highlight={i % 2 === 0} />
        ))}
      </StyledTags>
    </Section>
  );
};

const Info = () => {
  const { results } = useOG();
  const { url, tags } = results;

  const numTwitter = tags.filter(t => isTwitterTag(t)).length;
  const numOG = tags.filter(t => isOGTag(t)).length;
  const numHtml = tags.length - numTwitter - numOG;

  return (
    <Section>
      <p>
        Showing results for{" "}
        <a href={url} target="_blank" rel="noopener">
          {url}
        </a>
        .
      </p>
      <p>
        Found <em>{numHtml} html</em> tags, <em>{numOG} open graph</em> tags,
        and <em>{numTwitter} twitter</em> tags
      </p>
    </Section>
  );
};

const Results = () => {
  return (
    <StyledResults>
      <Info />
      <Tags />
    </StyledResults>
  );
};

export default Results;
