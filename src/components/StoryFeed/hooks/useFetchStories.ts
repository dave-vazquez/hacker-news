import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";
import storyReducer, {
  RESULTS_PER_PAGE,
  initialState
} from "./storyReducer";

type StoryTuple = [Array<any>, boolean, boolean];

const useFetchStories = (
  storyType: string,
  pageNum: number
): StoryTuple => {
  const [{ stories, fetching, error }, dispatch] = useReducer(
    storyReducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "fetching" });

    axios
      .get(`/${storyType}stories.json`)
      .then(({ data: storyIds }) => {
        return fetchStories(storyIds, pageNum);
      })
      .then((storyData) => {
        dispatch({ type: "success", storyData });
      })
      .catch(() => {
        dispatch({ type: "error" });
      });
  }, [storyType, pageNum]);

  return [stories, fetching, error];
};

function fetchStories(storyIds: Array<number>, pageNum: number) {
  storyIds = slicePage(pageNum, storyIds);

  return Promise.all(
    storyIds.map(async (storyId: number) => {
      try {
        const { data } = await axios.get(`item/${storyId}.json`);
        return data ? data : { error: true };
      } catch (_) {
        return { error: true };
      }
    })
  );
}

function slicePage(pageNum: number, storyIds: Array<number>) {
  let startIndex = pageNum * RESULTS_PER_PAGE;
  let endIndex = startIndex + RESULTS_PER_PAGE;

  return storyIds.slice(startIndex, endIndex);
}

export default useFetchStories;
