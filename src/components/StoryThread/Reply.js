import "./comment.scss";

import parse from "html-react-parser";
import React from "react";
import upvote from "../../assets/upvote.png";
import ContentLoader from "../ContentLoader/ContentLoader";
import useFetchThread from "./hooks/useFetchThread";

const Reply = ({ reply }) => {
  const [directReplies, fetching, error] = useFetchThread(reply.kids);

  return (
    <article id="comment">
      <img id="upvote" src={upvote} alt="upvote arrow" />
      <header>
        <span>{reply.by}</span> on <time>{reply.time}</time> id{" "}
        <span>{reply.id}</span>
      </header>
      <div id="comment-body">{parse(`${reply.text}`)}</div>
      <ol>
        {fetching ? (
          <ContentLoader type="reply" />
        ) : error ? null : (
          directReplies.map((reply, i) => (
            <li key={i}>
              <Reply reply={reply} />
            </li>
          ))
        )}
      </ol>
    </article>
  );
};

export default Reply;
