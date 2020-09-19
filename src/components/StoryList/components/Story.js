import "./story.scss";

import React from "react";
import upvote from "../../../assets/upvote.png";
import formatElapsedTime from "../../../utils/formatElapsedTime";

const Story = (props) => {
  const {
    content: { url, title, score, user, time, numComments }
  } = props;

  const timeElapsed = formatElapsedTime(time);

  return (
    <>
      <img id="upvote" src={upvote} alt="upvote arrow" />
      <header>
        <h1>
          <a href={url} rel="noopener noreferrer" target="_blank">
            {title}
            <span id="source-url"> (https://somehowmanage.com)</span>
          </a>
        </h1>
      </header>
      <p id="details">
        <span>{score} points </span>
        <span>by {user} </span>
        <span>{timeElapsed} | </span>
        <span>hide | </span>
        <span>{numComments} comments</span>
      </p>
    </>
  );
};

export default Story;
