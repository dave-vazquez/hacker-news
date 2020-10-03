import "./styles/reply-section.scss";

import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Story from "../StoryFeed/Story";
import DirectReplyList from "./DirectReplyList";

type LocationState = {
  story: any;
};

type PropTypes = RouteComponentProps<{}, {}, LocationState>;

const ReplySection: React.FC<PropTypes> = ({ location }) => {
  const { story } = location.state;

  return (
    <main>
      <Story story={story} />
      <hr />
      <section id="reply-section">
        <DirectReplyList replyIds={story.kids} hidden={false} />
      </section>
    </main>
  );
};

export default ReplySection;
