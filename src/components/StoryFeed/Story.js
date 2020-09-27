import "./styles/story.scss";

import React from "react";
import { Link } from "react-router-dom";
import formatElapsedTime from "../../utils/formatElapsedTime";
import parseHostName from "../../utils/parseHostName";

const Story = ({ story, children }) => {
  const timeElapsed = formatElapsedTime(story.time);
  const sourceHost = parseHostName(story.url);

  return (
    <section id="story">
      <h2>
        <a href={story.url} rel="noopener noreferrer" target="_blank">
          {story.title}
          <span id="source-host">
            {sourceHost && ` (${sourceHost})`}
          </span>
        </a>
      </h2>
      <p aria-label="story details" id="story-details">
        <span>{story.score} points </span>
        <Link to={`/user/${story.by}`}>by {story.by} </Link>
        <time>{timeElapsed} </time> |{" "}
        <Link
          to={{
            pathname: `/story/${story.id}`,
            state: { story }
          }}
        >
          {story.descendants} comments
        </Link>
      </p>
      {children}
    </section>
  );
};

export default Story;
