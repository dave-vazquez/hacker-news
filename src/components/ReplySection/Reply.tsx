import "./styles/reply.scss";

import parse from "html-react-parser";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import upvote from "../../assets/upvote.png";
import formatElapsedTime from "../../utils/formatElapsedTime";
import DirectReplyList from "./DirectReplyList";

type PropTypes = {
  reply: any;
};

const Reply: React.FC<PropTypes> = ({ reply }) => {
  const [hidden, setHidden] = useState(false);

  const toggleHidden = () => setHidden((hidden) => !hidden);

  const timeElapsed = formatElapsedTime(reply.time);

  return (
    <article id="comment">
      <img src={upvote} alt="upvote" />
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
      </div>
      {reply.kids && (
        <DirectReplyList hidden={hidden} replyIds={reply.kids} />
      )}
    </article>
  );
};

export default Reply;
