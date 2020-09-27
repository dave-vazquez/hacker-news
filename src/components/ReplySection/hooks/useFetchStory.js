import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";
import storyReducer, {
  ERROR,
  FETCHING,
  SUCCESS,
  initialState
} from "./reducers/storyReducer";

const useFetchStory = (storyId) => {
  const [{ story, fetching, error }, dispatch] = useReducer(
    storyReducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: FETCHING });
    axios
      .get(`/item/${storyId}.json`)
      .then(({ data: story }) => dispatch({ type: SUCCESS, story }))
      .catch(() => dispatch({ type: ERROR }));
  }, [storyId]);

  return [story, fetching, error];
};

export default useFetchStory;
