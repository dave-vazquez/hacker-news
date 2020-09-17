import "./story-list.scss";

import React from "react";
import StoryListItem from "./components/StoryListItem";
import useFetchStoryIds from "./hooks/useFetchStoryIds";

const StoryList = () => {
  const [pages, error] = useFetchStoryIds("topstories");

  return (
    <main>
      {error ? (
        <center>Error Loading Story. Please try again later.</center>
      ) : (
        <ol>
          {pages[0].map((storyId, i) => (
            <StoryListItem key={i} storyId={storyId} />
          ))}
        </ol>
      )}
    </main>
  );
};

export default StoryList;
