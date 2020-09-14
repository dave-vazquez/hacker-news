import "./article.scss";

import React from "react";
import upvote from "../../assets/upvote.png";

const Article = () => {
  return (
    <article>
      <img id="upvote" src={upvote} alt="upvote arrow" />
      <header>
        <h1>
          <a
            href="https://somehowmanage.com/2020/09/13/disrespectful-design-users-arent-stupid-or-lazy/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Disrespectful Design - Users aren't stupid or lazy
            <span id="source-url"> (https://somehowmanage.com)</span>
          </a>
        </h1>
      </header>
      <p>80 points by Ozzie_osman 1 hour ago | hide | 47 comments</p>
    </article>
  );
};

export default Article;
