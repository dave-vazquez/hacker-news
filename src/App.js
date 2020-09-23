import "./styles/app.scss";

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  Footer,
  Header,
  PageNotFound,
  StoryList,
  StoryThread
} from "./components";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/stories/top/page/0" />}
        />
        <Route
          exact
          path="/stories/:type/page/:page"
          component={StoryList}
        />
        <Route path="/story/:id" component={StoryThread} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
