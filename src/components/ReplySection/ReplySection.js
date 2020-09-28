import "./styles/reply-section.scss";

import React from "react";
import Story from "../StoryFeed/Story";
import DirectReplyList from "./DirectReplyList";

const ReplySection = ({ location }) => {
  const { story } = location.state;

  return (
    <main>
      <Story story={story}>
        <hr />
        <section id="comments">
          <DirectReplyList replyIds={story.kids} />
        </section>
      </Story>
    </main>
  );
};

export default ReplySection;
