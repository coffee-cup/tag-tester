import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import { Styled } from "theme-ui";
import { MetaTag } from "../types";

const StyledTagsDisplay = styled.div(
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
  }),
);

const Row = styled(Styled.tr)(css({}));

const Header = styled(Styled.th)(css({}));

const Cell = styled(Styled.td)(css({}));

const TableTitle = styled.h3(
  css({
    bg: "secondary",
    mb: 2,
    p: 2,
  }),
);

const TableImage = styled.img(
  css({
    display: "block",
    maxWidth: "20rem",
  }),
);

const TagTable: React.FC<{
  title: string;
  nameProp: string;
  tags: MetaTag[];
}> = ({ title, nameProp, tags }) => (
  <div>
    <TableTitle>{title}</TableTitle>

    <Table>
      <thead>
        <Row>
          <Header>{nameProp}</Header>
          <Header>Content</Header>
        </Row>
      </thead>

      <tbody>
        {tags.map((tag, i) => (
          <Row key={i}>
            <Cell>{tag[nameProp.toLowerCase()]}</Cell>
            <Cell>
              {tag.content}

              {tag[nameProp.toLowerCase()] === "og:image" && (
                <TableImage alt="" src={tag.content} />
              )}
            </Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  </div>
);

const TagsDisplay = () => {
  const { tags } = useOG();

  const htmlTags = tags.filter(t => t.category === "html");
  const twitterTags = tags.filter(t => t.category === "twitter");
  const ogTags = tags.filter(t => t.category === "opengraph");

  return (
    <StyledTagsDisplay>
      <TagTable title="HTML" nameProp="Name" tags={htmlTags} />
      <TagTable title="Twitter" nameProp="Name" tags={twitterTags} />
      <TagTable title="Open Graph" nameProp="Property" tags={ogTags} />
    </StyledTagsDisplay>
  );
};

export default TagsDisplay;
