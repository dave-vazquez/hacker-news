import { useLayoutEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";

const FETCHING = "FETCHING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const initialState = {
  story: {},
  directReplies: Array(12).fill(null),
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
        story: action.payload.story,
        directReplies: action.payload.directReplies,
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

const useFetchStoryThread = (storyId) => {
  const [
    { story, directReplies, fetching, error },
    dispatch
  ] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    dispatch({ type: FETCHING });
    axios
      .get(`/item/${storyId}.json`)
      .then(async ({ data }) => {
        return {
          story: data,
          directReplies: await fetchDirectReplies(data.kids)
        };
      })
      .then(({ story, directReplies }) => {
        dispatch({
          type: SUCCESS,
          payload: {
            story,
            directReplies
          }
        });
      })
      .catch(() => {
        dispatch({ type: ERROR });
      });
  }, [storyId]);

  return [story, directReplies, fetching, error];
};

async function fetchDirectReplies(kids) {
  return kids
    ? Promise.all(
        kids.map(
          async (kid) =>
            await axios
              .get(`/item/${kid}.json`)
              .then(({ data }) => data)
        )
      )
    : [];
}

export default useFetchStoryThread;
