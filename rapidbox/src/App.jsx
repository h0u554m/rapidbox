import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/InitialPage";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<InitialPage />} exact />
      </Routes>
    </Router>
  );
};

export default App;
