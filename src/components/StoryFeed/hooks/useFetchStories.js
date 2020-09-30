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

function fetchStories(storyIds, pageNum) {
  storyIds = slicePage(pageNum, storyIds);

  return Promise.all(
    storyIds.map((storyId, i) => {
      return axios
        .get(`/item/${storyId}.json`)
        .then(({ data }) => {
          return data !== null ? data : { error: true };
        })
        .catch(() => {
          return { error: true };
        });
    })
  );
}

function slicePage(pageNum, storyIds) {
  let startIndex = pageNum * RESULTS_PER_PAGE;
  let endIndex = startIndex + RESULTS_PER_PAGE;

  return storyIds.slice(startIndex, endIndex);
}

export default useFetchStories;
