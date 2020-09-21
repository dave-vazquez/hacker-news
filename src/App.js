import "./styles/app.scss";

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  Footer,
  Header,
  PageNotFound,
  StoryList
} from "./components";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        {/* Creates a default route on page load */}
        <Route
          exact
          path="/"
          render={() => <Redirect to="/stories/top/page/0" />}
        />
        {/* Default route */}
        <Route
          path="/stories/:type/page/:page"
          component={StoryList}
        />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
