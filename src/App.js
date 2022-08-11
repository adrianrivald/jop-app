import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import HomePage from './pages/homepage';
import SignIn from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Sample from './pages/sample/Sample';
import Storybook from './pages/storybook';
import Mandor from './pages/assignment/mandor'
import MabesList from './pages/mabes/List';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Navigate to="/auth/login" replace />} />  {/* later add condition for auth */}
        <Route path="/auth/login" exact element={<SignIn/>} />
        <Route path="/auth/signup" exact element={<SignUp/>} />
        <Route path="/homepage" exact element={<HomePage/>} />
        <Route path="/sample" exact element={<Sample/>} />
        {/* mandor */}
        <Route path="/assignment/mandor/list" exact element={<Mandor />} />
        <Route path="/storybook" exact element={<Storybook/>} />
        <Route path="/mabes/list" exact element={<MabesList/>} />
      </Routes>
    </Router>
  );
}

export default App;
