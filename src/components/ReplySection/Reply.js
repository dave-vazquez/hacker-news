import "./styles/reply.scss";

import parse from "html-react-parser";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatElapsedTime from "../../utils/formatElapsedTime";
import DirectReplies from "./DirectReplyList";

const Reply = ({ reply }) => {
  const [hidden, setHidden] = useState(false);

  if (!reply) return null;

  const toggleHidden = () => setHidden((hidden) => !hidden);

  const timeElapsed = formatElapsedTime(reply.time);

  return (
    <article id="comment">
      <header>
        <Link to={`/user/${reply.by}`}>{reply.by}</Link>
        <time>{timeElapsed}</time>
        <button onClick={toggleHidden}>[-]</button>
      </header>
      <button id="thread" onClick={toggleHidden} />
      <div
        id="comment-body-container"
        className={`${hidden ? " hidden" : ""}`}
      >
        <div id="comment-body">{parse(`${reply.text}`)}</div>
        <DirectReplies replyIds={reply.kids} />
      </div>
    </article>
  );
};

export default Reply;
