import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Library, Workspace, Profile, KeyManagement} from "./pages";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
                <Route element={<Library />} path="/library" />
                <Route element={<Workspace />} path="/workspace" />
                <Route element={<KeyManagement />} path="/keyManagement" />
                <Route element={<Profile />} path="/profile" />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
