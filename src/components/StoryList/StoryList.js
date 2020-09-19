import "./story-list.scss";

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ContentLoader from "../ContentLoader/ContentLoader";
import Story from "./components/Story";
import useFetchStories from "./hooks/useFetchStories";

const StoryList = ({ match }) => {
  const { page: pageNum, type } = match.params;

  const startIdx = useMemo(() => {
    return +pageNum * 25 + 1;
  }, [pageNum]);

  const [stories, fetching, error] = useFetchStories(type, pageNum);

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
        {stories.map((story, i) => (
          <li key={i}>
            {fetching ? <ContentLoader /> : <Story story={story} />}
          </li>
        ))}
      </ol>
      <Link to={`/stories/${type}/page/${+pageNum + 1}`}>
        More...
      </Link>
    </main>
  );
};

export default StoryList;
