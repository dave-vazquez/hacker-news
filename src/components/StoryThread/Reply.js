import "./reply.scss";

import parse from "html-react-parser";
import React from "react";
import upvote from "../../assets/upvote.png";
import formatElapsedTime from "../../utils/formatElapsedTime";
import ContentLoader from "../ContentLoader/ContentLoader";
import useFetchThread from "./hooks/useFetchThread";

const Reply = ({ reply }) => {
  const [directReplies, fetching, error] = useFetchThread(reply.kids);

  const time = formatElapsedTime(reply.time);

  return (
    <section aria-label="comment" id="comment">
      <img id="upvote" src={upvote} alt="upvote arrow" />
      <header>
        <p aria-label="comment author and time posted">
          {reply.by} {time}
        </p>
      </header>
      <div aria-label="comment body" id="comment-body">
        {parse(`${reply.text}`)}
      </div>
      <ul>
        {fetching ? (
          <ContentLoader type="reply" />
        ) : error ? null : (
          directReplies.map((reply, i) => (
            <li key={i}>
              <Reply reply={reply} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default Reply;
