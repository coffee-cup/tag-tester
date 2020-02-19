import { generateTagPage } from "../src/server/template";
import { makeTag } from "../src/tags";

describe("html template", () => {
  it("can generate page from tags", () => {
    const tags = [makeTag("title", "a title"), makeTag("og:image", "a image")];
    const page = generateTagPage("https://tagtester.dev", tags, ["title"]);

    expect(page).toMatchSnapshot();
  });

  it("can generate page from tags with no custom", () => {
    const tags = [makeTag("title", "a title"), makeTag("og:image", "a image")];
    const page = generateTagPage("https://tagtester.dev", tags, []);

    expect(page).toMatchSnapshot();
  });

  it("can generated page with deleted tags", () => {
    const tags = [makeTag("title", undefined), makeTag("og:image", "a image")];
    const page = generateTagPage("https://tagtester.dev", tags, ["title"]);

    expect(page).toMatchSnapshot();
  });
});
