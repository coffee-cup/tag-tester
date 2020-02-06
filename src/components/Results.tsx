import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import { Styled } from "theme-ui";
import { MetaTag } from "../types";
import Section from "./Section";

const StyledResults = styled.div(
  css({
    whiteSpace: "pre",
    my: 2,
  }),
);

const Table = styled(Styled.table)(
  css({
    maxWidth: "100%",
    borderCollapse: "collapse",
    borderSpacing: 0,
    p: 0,
  }),
);

const Row = styled(Styled.tr)(
  css({
    "&:nth-child(even) td": {
      bg: "muted",
    },
  }),
);

const TagName = styled(Styled.td)(
  css({
    border: "solid 2px transparent",
    fontWeight: "bold",
  }),
);

const TagValue = styled(Styled.td)(
  css({
    border: "solid 2px transparent",
  }),
);

const TableImage = styled.img(
  css({
    display: "block",
    maxWidth: "20rem",
  }),
);

const StyledTagTable = styled.div(
  css({
    pb: 4,
  }),
);

const TagTable: React.FC<{
  tags: MetaTag[];
}> = ({ tags }) => (
  <StyledTagTable>
    <Table>
      <tbody>
        {tags.map((tag, i) => (
          <Row key={i}>
            <TagName>{tag.name ?? tag.property}</TagName>
            <TagValue>
              {tag.content}

              {(tag.name ?? tag.property) === "og:image" && (
                <TableImage alt="" src={tag.content} />
              )}
            </TagValue>
          </Row>
        ))}
      </tbody>
    </Table>
  </StyledTagTable>
);

const Info = () => {
  const { results } = useOG();
  const { url } = results;

  return (
    <Section>
      <p>
        Showing results for <a href={url}>{url}</a>.
      </p>
      <p>
        We found <em>11 html tags</em>, <em>2 open graph tags</em>, and{" "}
        <em>4 twitter tags</em>
      </p>
    </Section>
  );
};

const Tags = () => {
  const { results } = useOG();
  const { tags } = results;

  return (
    <Section>
      <TagTable tags={tags} />
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
