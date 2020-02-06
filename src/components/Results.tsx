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
  }),
);

const Row = styled(Styled.tr)(css({}));

const Header = styled(Styled.th)(css({}));

const Cell = styled(Styled.td)(css({}));

const TableTitle = styled.h3(
  css({
    bg: "secondary",
    mt: 0,
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

const StyledTagTable = styled.div(
  css({
    pb: 4,
  }),
);

const TagTable: React.FC<{
  title: string;
  nameProp: string;
  tags: MetaTag[];
}> = ({ title, nameProp, tags }) => (
  <StyledTagTable>
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

  const htmlTags = tags.filter(t => t.category === "html");
  const twitterTags = tags.filter(t => t.category === "twitter");
  const ogTags = tags.filter(t => t.category === "opengraph");

  return (
    <Section>
      <TagTable title="HTML" nameProp="Name" tags={htmlTags} />
      <TagTable title="Twitter" nameProp="Name" tags={twitterTags} />
      <TagTable title="Open Graph" nameProp="Property" tags={ogTags} />
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
