import "./content-loader.scss";

import React from "react";
import { ReactComponent as SkeletonLoader } from "../../assets/article-skeleton-loader.svg";

const ContentLoader = () => {
  return (
    <div>
      <SkeletonLoader />
    </div>
  );
};

export default ContentLoader;
