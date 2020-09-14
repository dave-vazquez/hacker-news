import "./styles/app.scss";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header, StoryList } from "./components";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <StoryList />
      </div>
    </Router>
  );
};

export default App;
