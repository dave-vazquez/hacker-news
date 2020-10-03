import "./page-not-found.scss";

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/stories/top/page/0");
    }, 3000);
  }, [history]);

  return (
    <main id="not-found">
      <p>404 - Page not Found.</p>
      <p>You will be redirected momentarily...</p>
    </main>
  );
};

export default PageNotFound;
