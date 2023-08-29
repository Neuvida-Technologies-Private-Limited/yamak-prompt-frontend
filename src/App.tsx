import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Library, Workspace, Profile, KeyManagement, Dashboard } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Dashboard />} path="/home">
            <Route element={<Library />} path="/home" />
            <Route element={<Workspace />} path="/home/workspace" />
            <Route element={<KeyManagement />} path="/home/keyManagement" />
            <Route element={<Profile />} path="/home/profile" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
