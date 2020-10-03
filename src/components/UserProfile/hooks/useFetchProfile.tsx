import { useEffect, useReducer } from "react";
import axios from "../../../utils/axios-instance";
import userProfileReducer, {
  initialState
} from "./userProfileReducer";

type ProfileTuple = [any, boolean, boolean];

const useFetchUserProfile = (username: string): ProfileTuple => {
  const [{ profile, fetching, error }, dispatch] = useReducer(
    userProfileReducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "fetching" });

    axios
      .get(`/user/${username}.json`)
      .then(({ data }) => {
        dispatch({ type: "success", profile: data });
      })
      .catch(() => {
        dispatch({ type: "error" });
      });
  }, [username]);

  return [profile, fetching, error];
};

export default useFetchUserProfile;
