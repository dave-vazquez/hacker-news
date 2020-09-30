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
  }, [replyIds]);

  return [directReplies, fetching, error];
};

async function fetchDirectReplies(replyIds) {
  const directReplies = await Promise.all(
    replyIds.map((replyId) => {
      return axios
        .get(`/item/${replyId}.json`)
        .then(({ data }) => (data.deleted ? null : data))
        .catch(() => null);
    })
  );

  return directReplies.filter((reply) => reply !== null);
}

export default useFetchDirectReplies;
