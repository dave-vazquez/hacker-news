import "./styles/story-thread.scss";

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
    <main>
      {fetching ? (
        <ContentLoader type="story" />
      ) : (
        <Story story={story} />
      )}
      <hr />
      <section id="replies">
        <ol>
          {directReplies.map((reply, i) => (
            <li key={i}>
              {fetching ? (
                <ContentLoader type="reply" />
              ) : (
                <Reply reply={reply} />
              )}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
};

export default StoryThread;
