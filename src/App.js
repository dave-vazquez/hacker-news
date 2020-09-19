import "./styles/app.scss";

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Footer, Header, StoryList } from "./components";

const App = () => {
  return (
    <div className="app">
      <Header />

      {/* Creates a default route on page load */}
      <Route
        exact
        path="/(|stories)"
        render={() => <Redirect to="/stories/top/page/0" />}
      />
      {/* Default route */}
      <Route path="/stories/:type/page/:page" component={StoryList} />

      <Footer />
    </div>
  );
};

export default App;
