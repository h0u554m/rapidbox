import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import SolvingPage from "./pages/SolvingPage";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<InitialPage />} exact />
        <Route path="/solving" element={<SolvingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
