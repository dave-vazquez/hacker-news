import { useLayoutEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";

const FETCHING = "FETCHING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const initialState = {
  directReplies: [],
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
        directReplies: action.directReplies,
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

const useFetchThread = (reply) => {
  const [{ directReplies, fetching, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useLayoutEffect(() => {
    if (reply) {
      if (reply.kids) {
        dispatch({ type: FETCHING });

        fetchDirectReplies(reply.kids)
          .then((directReplies) =>
            dispatch({ type: SUCCESS, directReplies })
          )
          .catch(() => dispatch({ type: ERROR }));
      } else {
        dispatch({ type: SUCCESS, directReplies: [] });
      }
    } else {
      dispatch({ type: ERROR });
    }
  }, [reply]);

  return [directReplies, fetching, error];
};

function fetchDirectReplies(kids) {
  return Promise.all(
    kids.map(
      async (kid) =>
        await axios.get(`/item/${kid}.json`).then(({ data }) => data)
    )
  );
}

export default useFetchThread;
