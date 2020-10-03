import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";
import directRepliesReducer, {
  initialState
} from "./directRepliesReducer";

type DirectRepliesTuple = [Array<any>, boolean, boolean];

const useFetchDirectReplies = (
  replyIds: Array<number>
): DirectRepliesTuple => {
  const [{ directReplies, fetching, error }, dispatch] = useReducer(
    directRepliesReducer,
    initialState
  );

  useEffect(() => {
    dispatch({
      type: "fetching",
      directReplies: Array(replyIds.length).fill(null)
    });

    fetchDirectReplies(replyIds)
      .then((directReplies) => {
        dispatch({ type: "success", directReplies });
      })
      .catch(() => {
        dispatch({ type: "error" });
      });
  }, [replyIds]);

  return [directReplies, fetching, error];
};

async function fetchDirectReplies(replyIds: Array<number>) {
  const directReplies = await Promise.all(
    replyIds.map(async (replyId) => {
      try {
        const { data } = await axios.get(`item/${replyId}.json`);
        return data?.deleted ? null : data;
      } catch (e) {
        return null;
      }
    })
  );

  return directReplies.filter((reply) => reply !== null);
}

export default useFetchDirectReplies;
