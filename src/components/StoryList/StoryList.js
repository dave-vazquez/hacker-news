import "./story-list.scss";

import React from "react";
import { useRouteMatch } from "react-router-dom";
import StoryListItem from "./components/StoryListItem";
import useFetchStoryIds from "./hooks/useFetchStoryIds";

const StoryList = () => {
  const match = useRouteMatch({
    path: "/stories/:type",
    strict: true,
    sensitive: true
  });

  const [pages, error] = useFetchStoryIds(match.params.type);

  if (error)
    return (
      <main>
        <center>
          Error Loading Stories. Please try again later.
        </center>
      </main>
    );

  return (
    <main>
      <ol>
        {pages[0].map((storyId, i) => (
          <StoryListItem key={i} storyId={storyId} />
        ))}
      </ol>
    </main>
  );
};

export default StoryList;
