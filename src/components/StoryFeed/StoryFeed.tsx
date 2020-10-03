import "./styles/story-feed.scss";

import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ContentLoader from "../ContentLoader/ContentLoader";
import Pagination from "./Pagination";
import Story from "./Story";
import useFetchStories from "./hooks/useFetchStories";

type RouteParams = {
  page: string;
  type: string;
};

type PropTypes = RouteComponentProps<RouteParams>;

const StoryFeed: React.FC<PropTypes> = ({ match }) => {
  const { page: pageNum, type: storyType } = match.params;

  const [stories, fetching, error] = useFetchStories(
    storyType,
    +pageNum
  );

  const startIdx = resolveStartIndex(+pageNum);

  if (error)
    return (
      <main>
        <p id="feed-error">
          Error Loading Stories. Please try again later.
        </p>
      </main>
    );

  return (
    <main>
      <ol start={startIdx}>
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

function resolveStartIndex(pageNum: number) {
  return pageNum * 30 + 1;
}

export default StoryFeed;
