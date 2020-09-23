import "./story-thread.scss";

import React from "react";
import ContentLoader from "../ContentLoader/ContentLoader";
import Story from "../StoryList/Story";
import Reply from "./Reply";
import useFetchStoryThread from "./hooks/useFetchStoryThread";

const StoryThread = ({ match }) => {
  const { id: storyId } = match.params;

  const [story, directReplies, fetching, error] = useFetchStoryThread(
    storyId
  );

  if (error)
    return (
      <main>
        <center>Error Loading Thread. Try again later.</center>
      </main>
    );

  return (
    <main aria-label="story comments">
      {fetching ? (
        <ContentLoader type="story" />
      ) : (
        <Story story={story} />
      )}
      <hr />
      <section aria-label="comment thread" id="replies">
        <ul>
          {directReplies.map((reply, i) => (
            <li key={i}>
              {fetching ? (
                <ContentLoader type="reply" />
              ) : (
                <Reply reply={reply} />
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default StoryThread;
