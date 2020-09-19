import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";

const RESULTS_PER_PAGE = 30;
const FETCHING = "FETCHING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const initialState = {
  stories: Array(RESULTS_PER_PAGE).fill(null),
  fetching: true,
  error: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCHING:
      return initialState;
    case ERROR:
      return {
        ...state,
        fetching: false,
        error: true
      };
    case SUCCESS: {
      return {
        stories: action.stories,
        fetching: false,
        error: false
      };
    }
    default:
      return {
        ...state,
        error: true
      };
  }
};

const useFetchStories = (storyType, pageNum) => {
  const [{ stories, fetching, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: FETCHING });

    axios
      .get(`/${storyType}stories.json`)
      .then(({ data: storyIds }) => fetchStories(storyIds, pageNum))
      .then((stories) => dispatch({ type: SUCCESS, stories }))
      .catch(() => dispatch({ type: ERROR }));
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
