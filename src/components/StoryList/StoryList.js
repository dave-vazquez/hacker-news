import "./story-list.scss";

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StoryListItem from "./components/StoryListItem";
import useFetchStoryIds from "./hooks/useFetchStoryIds";

const StoryList = ({ match, history }) => {
  const { page, type } = match.params;

  const startIndex = useMemo(() => +page * 25 + 1, [page]);

  const [pages, error] = useFetchStoryIds(type);

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
      <ol start={startIndex}>
        {pages[page].map((storyId, i) => (
          <StoryListItem key={i} storyId={storyId} />
        ))}
      </ol>
      <Link to={`/stories/${type}/${+page + 1}`}>More...</Link>
    </main>
  );
};

export default StoryList;
