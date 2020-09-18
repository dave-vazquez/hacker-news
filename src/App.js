import "./styles/app.scss";

import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Footer, Header, StoryList } from "./components";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Route path="/stories/:type" component={StoryList} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
