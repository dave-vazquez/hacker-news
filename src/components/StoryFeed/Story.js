import "./styles/story.scss";

import React from "react";
import { Link } from "react-router-dom";
import formatElapsedTime from "../../utils/formatElapsedTime";

const Story = ({ story }) => {
  const timeElapsed = formatElapsedTime(story.time);

  return (
    <section id="story">
      <h2>
        <a href={story.url} rel="noopener noreferrer" target="_blank">
          {story.title}
          <span id="source-url"> (https://somehowmanage.com)</span>
        </a>
      </h2>
      <p id="details">
        <span>{story.score} points </span>
        <span>by {story.by} </span>
        <time>{timeElapsed} | </time>
        <span>hide | </span>
        <Link to={`/story/${story.id}`}>
          {story.descendants} comments
        </Link>
      </p>
    </section>
  );
};

export default Story;
