import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/homepage/HomePage';
import SignIn from './pages/auth/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/auth" exact element={<SignIn/>} />
      </Routes>
    </Router>
  );
}

export default App;
