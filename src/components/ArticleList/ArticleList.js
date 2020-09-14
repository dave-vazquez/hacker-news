import "./article-list.scss";

import React from "react";
import Article from "./Article";

const ArticleList = () => {
  return (
    <main>
      <ol>
        <li>
          <Article />
        </li>
      </ol>
    </main>
  );
};

export default ArticleList;
