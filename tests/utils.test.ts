import { prefixUrl, validUrl } from "../src/utils";

describe("prefix url", () => {
  it("prefixes when there is no prefix", () => {
    expect(prefixUrl("tagtester.dev")).toBe("https://tagtester.dev");
  });

  it("does not prefixes when there is a prefix", () => {
    expect(prefixUrl("https://tagtester.dev")).toBe("https://tagtester.dev");
    expect(prefixUrl("http://tagtester.dev")).toBe("http://tagtester.dev");
  });
});

describe("valid url", () => {
  it("tests that a url is valid", () => {
    expect(validUrl("asdfasf")).toBe(false);
    expect(validUrl("hello.")).toBe(false);
    expect(validUrl("http://asdf.")).toBe(false);

    expect(validUrl("tagtester.dev")).toBe(true);
    expect(validUrl("https://jakerunzer.com")).toBe(true);
    expect(validUrl("http://hello.com")).toBe(true);
  });
});
