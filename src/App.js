import "./styles/app.scss";

import React from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import { Footer, Header, StoryList } from "./components";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        {/* Creates a default route on page load */}
        <Route
          exact
          path="/(|stories)(|stories/top)"
          render={() => <Redirect to="/stories/top/0" />}
        />
        {/* Default route */}
        <Route path="/stories/:type/:page" component={StoryList} />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
