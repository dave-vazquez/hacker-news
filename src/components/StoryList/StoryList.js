import "./story-list.scss";

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StoryListItem from "./components/StoryListItem";
import useFetchStoryIds from "./hooks/useFetchStoryIds";

const StoryList = ({ match }) => {
  const { page, type } = match.params;

  const [pages, error] = useFetchStoryIds(type);
  const [pageNum, setPageNum] = useState(page ? Number(page) : 0);

  const startIndex = useMemo(() => pageNum * 25 + 1, [pageNum]);

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
        {pages[pageNum].map((storyId, i) => (
          <StoryListItem
            key={i}
            storyId={storyId}
            startNum={pageNum}
          />
        ))}
      </ol>
      <Link
        onClick={() => setPageNum((pageNum) => pageNum + 1)}
        to={`/stories/${type}/${pageNum + 1}`}
      >
        More...
      </Link>
    </main>
  );
};

export default StoryList;
