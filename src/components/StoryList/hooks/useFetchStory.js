import { useLayoutEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";

const FETCHING = "FETCHING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const initialState = {
  story: null,
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
        story: action.story,
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

const useFetchStory = (storyId) => {
  const [{ story, fetching, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useLayoutEffect(() => {
    if (storyId) {
      dispatch({ type: FETCHING });
      axios
        .get(`/item/${storyId}.json`)
        .then(({ data }) => dispatch({ type: SUCCESS, story: data }))
        .catch(() => dispatch({ type: ERROR }));
    }
  }, [storyId]);

  return [story, fetching, error];
};

export default useFetchStory;
