import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from './pages/homepage';
import SignIn from './pages/auth/login';
import Sample from './pages/sample/Sample';
import Storybook from './pages/storybook';
import Mandor from './pages/assignment/mandor';
import MandorAcceptAssignment from './pages/assignment/mandor/accept';
import MandorDiversionAssignment from './pages/assignment/mandor/diversion';
import Mabes from './pages/assignment/mabes';
import MabesAssignment from './pages/assignment/mabes/new-assignment';
import MabesDetail from './pages/assignment/mabes/detail';
import MabesDetailAction from './pages/assignment/mabes/detail/action';
import MabesEdit from './pages/assignment/mabes/edit';
import Cookies from 'universal-cookie';
import DetailTapper from './pages/absence/tapper';
import Absence from './pages/absence';
import AbsenceList from './pages/absence/list';
import AbsenceIn from './pages/absence/scan/in';
import AbsenceOut from './pages/absence/scan/out';
import TapperPlanning from './pages/assignment/mandor/tapper';

function App() {
  const cookies = new Cookies();
  const path = window.location.pathname;

  React.useEffect(() => {
    if (!cookies.get('token') && path !== '/auth/login') {
      window.location.href = `${window.location.origin}/auth/login`
    }
    if (cookies.get('token') && path === '/auth/login') {
      window.location.href = `${window.location.origin}/homepage`
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Navigate to="/auth/login" replace />} />  {/* later add condition for auth */}
        <Route path="/auth/login" exact element={<SignIn/>} />
        <Route path="/homepage" exact element={<HomePage/>} />
        <Route path="/sample" exact element={<Sample/>} />
        {/* mandor */}
        <Route path="/assignment/mandor/list" exact element={<Mandor />} />
        <Route path="/assignment/mandor/detail/:id/accept" exact element={<MandorAcceptAssignment />} />
        <Route path="/assignment/mandor/detail/:id/diversion" exact element={<MandorDiversionAssignment />} />
        <Route path="/assignment/mandor/tapper/:id" exact element={<TapperPlanning />} />
        {/* mabes */}
        <Route path="/assignment/mabes/list" exact element={<Mabes/>} />
        <Route path="/assignment/mabes/new-assignment" exact element={<MabesAssignment/>} />
        <Route path="/assignment/mabes/detail/:id" exact element={<MabesDetail/>} />
        <Route path="/assignment/mabes/detail/:id/edit" exact element={<MabesEdit/>} />
        <Route path="/assignment/mabes/detail/action" exact element={<MabesDetailAction/>} />
        {/* absensi */}
        <Route path="/absence" exact element={<Absence />} />
        <Route path="/absence/:id_tugas" exact element={<AbsenceList />} />
        <Route path="/absence/:id_tugas/in" exact element={<AbsenceIn />} />
        <Route path="/absence/:id_tugas/out" exact element={<AbsenceOut />} />
        <Route path="/absence/tapper/:id" exact element={<DetailTapper />} />
        <Route path="/storybook" exact element={<Storybook/>} />
      </Routes>
    </Router>
  );
}

export default App;
