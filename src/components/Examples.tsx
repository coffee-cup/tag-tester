/** @jsx jsx */
import NextLink from "next/link";
import { jsx, Box, Link, Styled } from "theme-ui";

const ExampleLink: React.FC<{ url: string }> = ({ url }) => (
  <Styled.li>
    <NextLink href={`/${url}`}>
      <Link>{url}</Link>
    </NextLink>
  </Styled.li>
);

const Examples = () => (
  <Box>
    <Styled.p>Enter a url above or try with one of these examples</Styled.p>

    <Styled.ul>
      <ExampleLink url="tagtester.dev" />
      <ExampleLink url="github.com" />
      <ExampleLink url="reddit.com" />
      <ExampleLink url="vercel.com" />
      <ExampleLink url="dev.to" />
    </Styled.ul>
  </Box>
);

export default Examples;
