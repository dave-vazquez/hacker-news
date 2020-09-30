import "./styles/reply-section.scss";

import React from "react";
import Story from "../StoryFeed/Story";
import DirectReplyList from "./DirectReplyList";

const ReplySection = ({ location }) => {
  const { story } = location.state;

  return (
    <main>
      <Story story={story} />
      <hr />
      <section id="reply-section">
        <DirectReplyList replyIds={story.kids} />
      </section>
    </main>
  );
};

export default ReplySection;
