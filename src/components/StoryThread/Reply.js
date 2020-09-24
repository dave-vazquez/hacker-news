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
    <article id="comment">
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
      <section className={`${hidden ? "hidden" : ""}`}>
        <div id="comment-body">{parse(`${reply.text}`)}</div>
        <ol>
          {fetching ? (
            <ContentLoader type="reply" />
          ) : error ? null : (
            directReplies.map((reply, i) => {
              console.log("reply", reply);
              return (
                <li key={i}>
                  <Reply reply={reply} />
                </li>
              );
            })
          )}
        </ol>
      </section>
    </article>
  );
};

export default Reply;
