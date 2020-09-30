import "./styles/direct-reply-list.scss";

import React from "react";
import ContentLoader from "../ContentLoader/ContentLoader";
import Reply from "./Reply";
import useFetchDirectReplies from "./hooks/useFetchDirectReplies";

const DirectReplyList = ({ replyIds, hidden }) => {
  const [directReplies, fetching, error] = useFetchDirectReplies(
    replyIds
  );

  if (error) return <p id="error">Error Loading Replies</p>;

  return (
    <ul className={`${hidden ? " hidden" : ""}`}>
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
  );
};

export default DirectReplyList;
