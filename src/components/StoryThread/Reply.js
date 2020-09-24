import "./styles/reply.scss";

import parse from "html-react-parser";
import React, { useState } from "react";
import upvote from "../../assets/upvote.png";
import formatElapsedTime from "../../utils/formatElapsedTime";
import ContentLoader from "../ContentLoader/ContentLoader";
import useFetchThread from "./hooks/useFetchThread";

const Reply = ({ reply }) => {
  const [hidden, setHidden] = useState(false);
  const [directReplies, fetching, error] = useFetchThread(reply);

  if (!reply) return null;

  const toggleHidden = () => setHidden((hidden) => !hidden);

  const timeElapsed = formatElapsedTime(reply.time);

  return (
    <section id="reply">
      <img id="upvote" src={upvote} alt="upvote arrow" />
      <div id="thread" onClick={toggleHidden} />
      <header>
        <span>{reply.by}</span>
        <time>{timeElapsed}</time>
        <span id="toggle" onClick={toggleHidden}>
          {" "}
          [-]
        </span>
      </header>
      <div
        id="reply-container"
        className={`${hidden ? " hidden" : ""}`}
      >
        <div id="reply-body">{parse(`${reply.text}`)}</div>
        <ol id="direct-replies">
          {fetching ? (
            <ContentLoader type="reply" />
          ) : error ? null : (
            directReplies.map((reply, i) => {
              return (
                <li key={i}>
                  <Reply reply={reply} />
                </li>
              );
            })
          )}
        </ol>
      </div>
    </section>
  );
};

export default Reply;
