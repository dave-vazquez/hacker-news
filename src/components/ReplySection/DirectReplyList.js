import "./styles/direct-reply-list.scss";

import React from "react";
import ContentLoader from "../ContentLoader/ContentLoader";
import Reply from "./Reply";
import useFetchDirectReplies from "./hooks/useFetchDirectReplies";

const DirectReplyList = ({ replyIds }) => {
  const [directReplies, fetching, error] = useFetchDirectReplies(
    replyIds
  );

  if (error) return null;

  return (
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
  );
};

export default DirectReplyList;
