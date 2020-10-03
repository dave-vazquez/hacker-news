import "./content-loader.scss";

import React from "react";
import { ReactComponent as ReplySkeletonLoader } from "../../assets/reply-skeleton-loader.svg";
import { ReactComponent as StorySkeletonLoader } from "../../assets/story-skeleton-loader.svg";

type PropTypes = {
  type: string;
};

const ContentLoader: React.FC<PropTypes> = ({ type }) => {
  return (
    <div id="svg-container">
      {type === "story" ? (
        <StorySkeletonLoader />
      ) : (
        <ReplySkeletonLoader />
      )}
    </div>
  );
};

export default ContentLoader;
