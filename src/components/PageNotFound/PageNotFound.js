import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/stories/top/page/0");
    }, 2000);
  }, [history]);

  return (
    <main>
      <center>404 - Page not Found.</center>
      <center>You will be redirected momentarily.</center>
    </main>
  );
};

export default PageNotFound;
