import { MetaTag } from "../types";
import { getNameProp, getValueProp } from "../tags";

const generateSingleTag = (tag: MetaTag): string => {
  if (tag.name === "title") {
    return `    <title>${tag.content}</title>`;
  }

  const nameProp = getNameProp(tag);
  const valueProp = getValueProp(tag);

  return `    <meta ${nameProp}="${tag.name ??
    tag.property}" ${valueProp}="${tag.content ?? tag.value}" /> `;
};

export const generatePage = (tags: MetaTag[]): string => {
  const meta: string = tags.map(t => generateSingleTag(t)).join("\n");

  const html = `
<html>

  <head>
${meta}
  </head>

  <body>
    <h1>Tag test page</h1>
  </body>

</html>
`.trim();

  return html;
};
