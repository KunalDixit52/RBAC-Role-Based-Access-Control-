import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage"; // Ensure this path is correct
import RolesPage from "./pages/RolesPage";
import './App.css'; // Import the CSS file for styling

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Links */}
        <nav className="navigation">
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/users" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/roles" className="nav-link">Roles</Link>
            </li>
          </ul>
        </nav>

        {/* Routing to different pages */}
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
