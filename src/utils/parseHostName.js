export default (url) => {
  let hostname = "";

  if (url) {
    hostname =
      url.indexOf("//") > -1 ? url.split("/")[2] : url.split("/")[0];

    hostname = hostname.split(":")[0];
    hostname = hostname.split("?")[0];

    return hostname;
  }

  return hostname;
};
