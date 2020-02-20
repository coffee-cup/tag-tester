import { parseTags } from "../src/server/metadata";
import { makeTag } from "../src/tags";

describe("metadata parsing", () => {
  it("can parse empty html", () => {
    const html = `<html></html>`;
    expect(parseTags(html)).toEqual([]);
  });

  it("can parse title and meta tags", () => {
    const html = `
<html>
  <head>
    <title>test title</title>

    <meta name="robots" content="index,follow" />
    <meta name="description" content="desc" />
    <meta property="og:image" content="image">
    <meta name="twitter:card" value="card">
  </head>

  <body></body>
</html>
`;

    expect(parseTags(html)).toEqual([
      makeTag("title", "test title"),
      makeTag("robots", "index,follow"),
      makeTag("description", "desc"),
      makeTag("og:image", "image"),
      makeTag("twitter:card", "card"),
    ]);
  });

  it("does not parse title not in head", () => {
    const html = `
<html>
  <head></head>

  <body>
    <div>
      <title>not a title</title>
    </div>
  </body>
</html>
`;

    expect(parseTags(html)).toEqual([]);
  });
});
