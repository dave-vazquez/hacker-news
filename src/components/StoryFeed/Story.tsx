import "./styles/story.scss";

import React from "react";
import { Link } from "react-router-dom";
import upvote from "../../assets/upvote.png";
import formatElapsedTime from "../../utils/formatElapsedTime";
import parseHostName from "../../utils/parseHostName";

type PropTypes = {
  story: any;
};

const Story: React.FC<PropTypes> = (props) => {
  const story = props.story;

  if (story.error)
    return (
      <section id="story-error">
        <p>Error Loading Story</p>
      </section>
    );

  const timeElapsed = formatElapsedTime(story.time);
  const sourceHost = parseHostName(story.url);

  return (
    <section id="story">
      <img id="upvote" src={upvote} alt="upvote" />
      <h2>
        <a href={story.url} rel="noopener noreferrer" target="_blank">
          {story.title}
          <span id="source-host">
            {sourceHost && ` (${sourceHost})`}
          </span>
        </a>
      </h2>
      <p aria-label="story details" id="details">
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
    </section>
  );
};

export default Story;
