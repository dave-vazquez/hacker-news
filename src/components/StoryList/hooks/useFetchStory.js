import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";

const initialState = {
  content: null,
  fetching: true,
  error: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetching":
      return initialState;
    case "error":
      return {
        ...state,
        fetching: false,
        error: true
      };
    case "success":
      return {
        content: action.payload,
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

const useFetchStory = (storyId) => {
  const [{ content, fetching, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (storyId) {
      dispatch({ type: "fetching" });
      axios
        .get(`/item/${storyId}.json`)
        .then((res) => {
          dispatch({
            type: "success",
            payload: {
              ...res.data,
              user: res.data.by,
              numComments: res.data.descendants
            }
          });
        })
        .catch(() => {
          dispatch({ type: "error" });
        });
    }
  }, [storyId]);

  return [content, fetching, error];
};

export default useFetchStory;
