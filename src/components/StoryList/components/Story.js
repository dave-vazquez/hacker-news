import "./story.scss";

import React from "react";
import upvote from "../../../assets/upvote.png";
import formatElapsedTime from "../../../utils/formatElapsedTime";

const Story = ({ story }) => {
  const timeElapsed = formatElapsedTime(story.time);

  return (
    <article>
      <img id="upvote" src={upvote} alt="upvote arrow" />
      <header>
        <h1>
          <a
            href={story.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {story.title}
            <span id="source-url"> (https://somehowmanage.com)</span>
          </a>
        </h1>
      </header>
      <p id="details">
        <span>{story.score} points </span>
        <span>by {story.by} </span>
        <span>{timeElapsed} | </span>
        <span>hide | </span>
        <span>{story.descendants} comments</span>
      </p>
    </article>
  );
};

export default Story;
