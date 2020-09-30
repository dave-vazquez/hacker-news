import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";
import directRepliesReducer, {
  ERROR,
  FETCHING,
  SUCCESS,
  initialState
} from "./reducers/directRepliesReducer";

const useFetchDirectReplies = (replyIds) => {
  const [{ directReplies, fetching, error }, dispatch] = useReducer(
    directRepliesReducer,
    initialState
  );

  useEffect(() => {
    if (replyIds) {
      dispatch({
        type: FETCHING,
        directReplies: Array(replyIds.length).fill(null)
      });

      fetchDirectReplies(replyIds)
        .then((directReplies) => {
          dispatch({ type: SUCCESS, directReplies });
        })
        .catch(() => {
          dispatch({ type: ERROR });
        });
    } else {
      dispatch({ type: SUCCESS, directReplies: [] });
    }
  }, [replyIds]);

  return [directReplies, fetching, error];
};

function fetchDirectReplies(replyIds) {
  return Promise.all(
    replyIds.map((replyId) =>
      axios.get(`/item/${replyId}.json`).then(({ data }) => data)
    )
  );
}

export default useFetchDirectReplies;
