import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";
import userProfileReducer, {
  ERROR,
  FETCHING,
  SUCCESS,
  initialState
} from "./userProfileReducer";

const useFetchUserProfile = (username) => {
  const [{ profile, fetching, error }, dispatch] = useReducer(
    userProfileReducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: FETCHING });

    axios
      .get(`/user/${username}.json`)
      .then(({ data }) => {
        dispatch({ type: SUCCESS, profile: data });
      })
      .catch(() => {
        dispatch({ type: ERROR });
      });
  }, [username]);

  return [profile, fetching, error];
};

export default useFetchUserProfile;
