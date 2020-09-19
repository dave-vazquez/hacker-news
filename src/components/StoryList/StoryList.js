import "./story-list.scss";

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import StoryListItem from "./components/StoryListItem";
import useFetchStoryIds from "./hooks/useFetchStoryIds";

const StoryList = ({ match }) => {
  const { page, type } = match.params;

  const startIdx = useMemo(() => {
    return +page * 25 + 1;
  }, [page]);

  console.log("startIdx", startIdx);

  const [storyIds, fetching, error] = useFetchStoryIds(
    type,
    startIdx
  );

  console.log("storyIds", storyIds);
  console.log("****");

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
      <ol start={startIdx}>
        {storyIds.map((storyId, i) => (
          <StoryListItem key={i} storyId={storyId} />
        ))}
      </ol>
      <Link to={`/stories/${type}/page/${+page + 1}`}>More...</Link>
    </main>
  );
};

export default StoryList;
