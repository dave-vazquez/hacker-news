import "./user-profile.scss";

import React from "react";
import { Link } from "react-router-dom";
import formatElapsedTime from "../../utils/formatElapsedTime";
import ContentLoader from "../ContentLoader/ContentLoader";
import useFetchUserProfile from "./hooks/useFetchProfile";

const UserProfile = ({ match }) => {
  const {
    params: { username },
    path
  } = match;

  const [profile, fetching, error] = useFetchUserProfile(username);

  if (error) {
    return (
      <main>
        <center>Error Loading Data. Try again later.</center>
      </main>
    );
  }

  return (
    <main aria-label="user profile">
      {fetching ? (
        <ContentLoader type="story" />
      ) : (
        <section id="user-profile">
          <h2>
            <span>user:</span>
            <span>{profile.id}</span>
          </h2>
          <p>
            <span>created:</span>
            <span>{formatElapsedTime(profile.created)}</span>
          </p>
          <p>
            <span>karma:</span>
            <span>{profile.karma}</span>
          </p>
          <p>
            <span>about:</span>
            <Link
              to={{
                pathname: `/user/${profile.id}/submissions`,
                state: {
                  submissions: profile.submissions
                }
              }}
            >
              submissions
            </Link>
          </p>
        </section>
      )}
    </main>
  );
};

export default UserProfile;
