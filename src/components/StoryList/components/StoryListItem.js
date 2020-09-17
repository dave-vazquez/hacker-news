import "./story-list-item.scss";

import React from "react";
import { ReactComponent as ContentLoader } from "../../../assets/article-skeleton-loader.svg";
import useFetchStory from "../hooks/useFetchStory";
import Story from "./Story";

const StoryListItem = ({ storyId }) => {
  const [content, fetching, error] = useFetchStory(storyId);

  return (
    <li>
      <article>
        {fetching ? (
          <ContentLoader />
        ) : error ? (
          <span>Error Loading Story. Try Again Later.</span>
        ) : (
          <Story content={content} />
        )}
      </article>
    </li>
  );
};

export default StoryListItem;
