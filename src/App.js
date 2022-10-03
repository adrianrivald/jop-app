import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './pages/homepage';
import SignIn from './pages/auth/login';
import Storybook from './pages/storybook';
import MandorAcceptAssignment from './pages/assignment/mandor/accept';
import MandorDiversionAssignment from './pages/assignment/mandor/diversion';
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
import AddBalanced from './pages/balanced/add';
import DetailWeighing from './pages/weighing/mandor/detail';
import WeighingTapper from './pages/weighing/mandor/tapper';
import WeighingScan from './pages/weighing/mandor/detail/scan';
import Assignment from './pages/assignment';
import Weighing from './pages/weighing';
import Logistic from './pages/logistic';
import LogisticDetail from './pages/logistic/detail';
import LogisticLoading from './pages/logistic/loading';
import LogisticScan from './pages/logistic/scan';
import LogisticShipment from './pages/logistic/shipment';
import { FetchQueueHOC } from 'fetch-queue/hoc';
import './services/axios';
import Warehouse from './pages/warehouse';
import LogisticShipmentDetail from './pages/logistic/shipment/detail';


function App() {
  const cookies = new Cookies();
  const path = window.location.pathname;

  React.useEffect(() => {
    if (!cookies.get('token') && path !== '/auth/login') {
      window.location.href = `${window.location.origin}/auth/login`;
    }
    if (cookies.get('token') && path === '/auth/login') {
      window.location.href = `${window.location.origin}/homepage`;
    }
  }, []);

  return (
    <FetchQueueHOC>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Navigate to="/auth/login" replace />} />  
            {/* later add condition for auth */}
            <Route path="/auth/login" exact element={<SignIn/>} />
            <Route path="/homepage" exact element={<HomePage/>} />
            
            {/* penugasan */}
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/assignment/detail/:id/accept" exact element={<MandorAcceptAssignment />} />
            <Route path="/assignment/detail/:id/diversion" exact element={<MandorDiversionAssignment />} />
            <Route path="/assignment/tapper/:id" exact element={<TapperPlanning />} />

            <Route path="/assignment/add" exact element={<MabesAssignment/>} />
            <Route path="/assignment/detail/:id" exact element={<MabesDetail/>} />
            <Route path="/assignment/detail/:id/edit" exact element={<MabesEdit/>} />
            <Route path="/assignment/detail/action" exact element={<MabesDetailAction/>} />
              
            {/* absensi */}
            <Route path="/absence" exact element={<Absence />} />
            <Route path="/absence/:id_tugas" exact element={<AbsenceList />} />
            <Route path="/absence/:id_tugas/in" exact element={<AbsenceIn />} />
            <Route path="/absence/:id_tugas/out" exact element={<AbsenceOut />} />
            <Route path="/absence/tapper/:id" exact element={<DetailTapper />} />
            
            {/* penimbangan */}
            <Route path="/weighing" exact element={<Weighing />} />
            <Route path="/weighing/add" exact element={<AddBalanced />} />
            <Route path="/weighing/detail/:id" exact element={<DetailWeighing />} />
            <Route path="/weighing/detail/:id/tapper/:id_tapper" exact element={<WeighingTapper />} />
            <Route path="/weighing/detail/:id/scan" exact element={<WeighingScan />} />

            {/* pengiriman */}
            <Route path="/logistic" exact element={<Logistic />} />
            <Route path="/logistic/detail/:id" exact element={<LogisticDetail />} />
            <Route path="/logistic/loading/:id" exact element={<LogisticLoading />} />
            <Route path="/logistic/shipment/:id/" exact element={<LogisticShipment />} />
            <Route path="/logistic/shipment/:id/scan" exact element={<LogisticScan />} />
            <Route path="/logistic/shipment/detail/:id/" exact element={<LogisticShipmentDetail />} />
                
            {/* gudang */}
            <Route path="/warehouse" exact element={<Warehouse />} />
            
            {/* misc */}
            <Route path="/storybook" exact element={<Storybook/>} />
            <Route path="*" exact element={<div className="flex justify-center p-10">Route not found</div>} />
          </Routes>
        </Router>
      </Provider>
    </FetchQueueHOC>
  );
}

export default App;