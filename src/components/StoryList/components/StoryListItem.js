import "./story-list-item.scss";

import React from "react";
import ContentLoader from "../../ContentLoader/ContentLoader";
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
