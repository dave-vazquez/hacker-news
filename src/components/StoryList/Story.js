import "./styles/story.scss";

import React from "react";
import { Link } from "react-router-dom";
import upvote from "../../assets/upvote.png";
import formatElapsedTime from "../../utils/formatElapsedTime";
import ContentLoader from "../ContentLoader/ContentLoader";
import useFetchStory from "./hooks/useFetchStory";

const Story = ({ storyId }) => {
  const [story, fetching, error] = useFetchStory(storyId);

  if (fetching) return <ContentLoader type="story" />;
  if (error) return <p>Error Loading Story. Try again later.</p>;

  const timeElapsed = formatElapsedTime(story.time);

  return (
    <article id="story">
      <img id="upvote" src={upvote} alt="upvote article arrow" />
      <header>
        <h2>
          <a
            href={story.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {story.title}
            <span id="source-url"> (https://somehowmanage.com)</span>
          </a>
        </h2>
      </header>
      <p id="details">
        <span aria-label="points">{story.score} points </span>
        <span aria-label="author">by {story.by} </span>
        <time>{timeElapsed} | </time>
        <span>hide | </span>
        <Link to={`/story/${story.id}`} aria-label="comment thread">
          {story.descendants} comments
        </Link>
      </p>
    </article>
  );
};

export default Story;
