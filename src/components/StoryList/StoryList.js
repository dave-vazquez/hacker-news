import "./styles/story-list.scss";

import React from "react";
import ContentLoader from "../ContentLoader/ContentLoader";
import Pagination from "./Pagination";
import Story from "./Story";
import useFetchStories from "./hooks/useFetchStories";

const StoryList = ({ match }) => {
  const { page: pageNum, type: storyType } = match.params;

  const [stories, fetching, error] = useFetchStories(
    storyType,
    pageNum
  );

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
    <main aria-label={`${storyType} stories`}>
      <ol start={startIdx} aria-label={`of ${storyType} stories`}>
        {stories.map((story, i) => (
          <li key={i}>
            {fetching ? (
              <ContentLoader type="story" />
            ) : (
              <Story story={story} />
            )}
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
