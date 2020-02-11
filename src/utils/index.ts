export const validUrl = (url: any): boolean => {
  if (url == null || typeof url !== "string" || Array.isArray(url)) {
    return false;
  }

  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))|" + // OR ip (v4) address
    "localhost" + // OR localhost
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator;
    "i", // fragment locator
  );
  return !!pattern.test(url);
};
