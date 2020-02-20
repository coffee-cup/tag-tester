import { MetaTag } from "../types";
import { getNameProp, getValueProp } from "../tags";

export const createPage = (head: string, body: string): string =>
  `
<html lang="en">

  <head>
    <meta charset="utf-8" />
${head}

  <style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  font-weight: normal;
  color: #333;
  margin: 0;
  padding: 2rem;
}

main {
  display: flex;
  alignItems: center;
  justifyContent: center;
}

.content {
  margin: 0 auto;
  maxWidth: 62rem;
}

.url {
  color: #045aff;
}
  </style>

  </head>

  <body>
    <main>
      <div class="content">
${body}
      </div>
    </main>
  </body>

</html>
`;

const generateSingleTag = (tag: MetaTag): string => {
  if (tag.name === "title") {
    return `    <title>${tag.content}</title>`;
  }

  const nameProp = getNameProp(tag);
  const valueProp = getValueProp(tag);

  return `    <meta ${nameProp}="${tag.name ??
    tag.property}" ${valueProp}="${tag.content ?? tag.value}" /> `;
};

export const generateTagPage = (
  url: string,
  tags: MetaTag[],
  customTags: string[],
): string => {
  const meta: string = tags
    .filter(t => !(t.content == null && t.value == null))
    .map(t => generateSingleTag(t))
    .join("\n");

  const tagItems = customTags.map(t => `<li>${t}</li>`).join("\n");
  const tagMessage =
    customTags.length === 0
      ? "The original tags are being used as none have been modified"
      : `
Original metatags from <a href="${url}">${url}</a> have been combined with these modified
tags

${tagItems}
`;

  const debuggerLinks = `
Enter this url on the following metatag testers

<ul>
  <li><a href="https://cards-dev.twitter.com/validator">Twitter card validator</a></li>
  <li><a href="https://developers.facebook.com/tools/debug/">Facebook Debugger</a></li>
  <li><a href="https://www.linkedin.com/post-inspector/inspect/">LinkedIn insepctor</a></li>
</ul>
`;

  const body = `
<h1>Tag Tester page for <code class="url">${url}</code></h1>

<p><a href="https://tagtester.dev?url=${encodeURIComponent(
    url,
  )}">View on tagtester.dev</a>
</p>

<p>
${tagMessage}
</p>

<p>
${debuggerLinks}
</p>
`;

  const html = createPage(meta, body);
  return html;
};
