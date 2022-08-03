import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/homepage/HomePage';
import SignIn from './pages/auth/Login';
import SignUp from './pages/auth/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/auth/login" exact element={<SignIn/>} />
        <Route path="/auth/signup" exact element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
