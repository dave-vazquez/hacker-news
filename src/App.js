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
        <Route
          exact
          path="/"
          render={() => <Redirect to="/stories/top/page/0" />}
        />
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
