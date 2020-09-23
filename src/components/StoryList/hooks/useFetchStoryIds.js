import { useLayoutEffect, useState } from "react";
import axios from "../../../utils/axios-instance";

const RESULTS_PER_PAGE = 30;

const useFetchStoryIds = (storyType, pageNum) => {
  const [error, setError] = useState(false);
  const [storyIds, setStoryIds] = useState(
    Array(RESULTS_PER_PAGE).fill(null)
  );

  useLayoutEffect(() => {
    setError(false);
    axios
      .get(`/${storyType}stories.json`)
      .then(({ data: storyIds }) =>
        setStoryIds(sliceIds(storyIds, pageNum))
      )
      .catch(() => setError(true));
  }, [storyType, pageNum]);

  return [storyIds, error];
};

function sliceIds(storyIds, pageNum) {
  let startIndex = pageNum * RESULTS_PER_PAGE;
  let endIndex = startIndex + RESULTS_PER_PAGE;

  return storyIds.slice(startIndex, endIndex);
}

export default useFetchStoryIds;
