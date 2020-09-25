import { useLayoutEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";
import storyReducer, {
  ERROR,
  FETCHING,
  RESULTS_PER_PAGE,
  SUCCESS,
  initialState
} from "./storyReducer";

const useFetchStories = (storyType, pageNum) => {
  const [{ stories, fetching, error }, dispatch] = useReducer(
    storyReducer,
    initialState
  );

  useLayoutEffect(() => {
    dispatch({ type: FETCHING });

    axios
      .get(`/${storyType}stories.json`)
      .then(({ data: storyIds }) => {
        return fetchStories(storyIds, pageNum);
      })
      .then((storyData) => {
        dispatch({ type: SUCCESS, storyData });
      })
      .catch(() => {
        dispatch({ type: ERROR });
      });
  }, [storyType, pageNum]);

  return [stories, fetching, error];
};

async function fetchStories(storyIds, pageNum) {
  let startIndex = pageNum * RESULTS_PER_PAGE;
  let endIndex = startIndex + RESULTS_PER_PAGE;

  storyIds = storyIds.slice(startIndex, endIndex);

  return Promise.all(
    storyIds.map(
      async (storyId) =>
        await axios
          .get(`/item/${storyId}.json`)
          .then(({ data }) => data)
    )
  );
}

export default useFetchStories;
