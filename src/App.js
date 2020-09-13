import "./styles/app.scss";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
      </div>
    </Router>
  );
};

export default App;
