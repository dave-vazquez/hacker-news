import "./styles/story-list.scss";

import React, { useState } from "react";
import ContentLoader from "../ContentLoader/ContentLoader";
import Pagination from "./Pagination";
import Story from "./Story";
import useFetchStories from "./hooks/useFetchStories";
import useFetchStoryIds from "./hooks/useFetchStoryIds";

const StoryList = ({ match }) => {
  const { page: pageNum, type: storyType } = match.params;

  const [storyIds, error] = useFetchStoryIds(storyType, pageNum);

  const startIdx = resolveStartIndex(pageNum);

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
          <li key={i}>
            <Story storyId={storyId} />
          </li>
        ))}
      </ol>
      <Pagination storyType={storyType} pageNum={+pageNum} />
    </main>
  );
};

function resolveStartIndex(pageNum) {
  return +pageNum * 30 + 1;
}

export default StoryList;
