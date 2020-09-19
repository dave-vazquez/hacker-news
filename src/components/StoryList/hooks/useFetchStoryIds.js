import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";

const RESULTS_PER_PAGE = 25;
const FETCHING = "FETCHING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const initialState = {
  storyIds: Array(RESULTS_PER_PAGE).fill(false),
  fetching: false,
  error: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...initialState,
        fetching: true
      };
    case ERROR:
      return {
        ...state,
        fetching: false,
        error: true
      };
    case SUCCESS:
      return {
        storyIds: action.payload,
        fetching: false,
        error: false
      };
    default:
      return {
        ...state,
        error: true
      };
  }
};

const useFetchStoryIds = (storyType, startIdx) => {
  const [{ storyIds, fetching, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: FETCHING });

    axios
      .get(`/${storyType}stories.json`)
      .then((res) =>
        dispatch({
          type: SUCCESS,
          payload: sliceArray(res.data, startIdx)
        })
      )
      .catch(() => dispatch({ type: ERROR }));
  }, [storyType, startIdx]);

  return [storyIds, fetching, error];
};

function sliceArray(array, startIdx) {
  return array.slice(startIdx, startIdx + RESULTS_PER_PAGE);
}

export default useFetchStoryIds;
