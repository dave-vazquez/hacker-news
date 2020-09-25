import "./styles/direct-reply.scss";

import React from "react";
import ContentLoader from "../ContentLoader/ContentLoader";
import Reply from "./Reply";
import useFetchDirectReplies from "./hooks/useFetchDirectReplies";

const DirectReplies = ({ replyIds }) => {
  const [directReplies, fetching, error] = useFetchDirectReplies(
    replyIds
  );

  if (error) return null;

  return (
    <section id="direct-comments">
      <ul>
        {directReplies.map((reply, i) => {
          return (
            <li key={i}>
              {fetching ? (
                <ContentLoader type="reply" />
              ) : (
                <Reply reply={reply} />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default DirectReplies;
