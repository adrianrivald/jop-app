import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/homepage/HomePage';
import SignIn from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import Sample from './pages/sample/Sample';
import MabesList from './pages/mabes/List';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/auth/login" exact element={<SignIn/>} />
        <Route path="/auth/signup" exact element={<SignUp/>} />
        <Route path="/sample" exact element={<Sample/>} />
        <Route path="/mabes/list" exact element={<MabesList/>} />
      </Routes>
    </Router>
  );
}

export default App;
