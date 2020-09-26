import "./styles/comment-section.scss";

import React from "react";
import ContentLoader from "../ContentLoader/ContentLoader";
import Story from "../StoryFeed/Story";
import DirectReplies from "./DirectReplies";
import useFetchStory from "./hooks/useFetchStory";

const CommentSection = ({ match }) => {
  const { id: storyId } = match.params;

  const [story, fetching, error] = useFetchStory(storyId);

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
      <DirectReplies replyIds={story.kids} />
    </main>
  );
};

export default CommentSection;
