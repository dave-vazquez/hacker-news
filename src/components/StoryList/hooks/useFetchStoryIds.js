import { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";

const initialPagesState = [Array(25).fill(false)];

const useFetchStoryIds = (storyType) => {
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(initialPagesState);

  console.log(storyType);

  useEffect(() => {
    setError(false);

    axios
      .get(`/${storyType}stories.json`)
      .then((res) => setPages(chunkify(res.data)))
      .catch(() => setError(true));
  }, [storyType]);

  return [pages, error];
};

function chunkify(array) {
  let index = 0;
  let chunkedArray = [];

  while (index <= 200) {
    chunkedArray.push(array.slice(index, index + 25));
    index += 25;
  }

  return chunkedArray;
}

export default useFetchStoryIds;
