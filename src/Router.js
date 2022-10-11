import RouteGuard from './components/ui/RouteGuard';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/login';
import HomePage from './pages/homepage';
import Assignment from './pages/assignment';
import MandorAcceptAssignment from './pages/assignment/mandor/accept';
import MandorDiversionAssignment from './pages/assignment/mandor/diversion';
import TapperPlanning from './pages/assignment/mandor/tapper';
import MabesAssignment from './pages/assignment/mabes/new-assignment';
import MabesDetail from './pages/assignment/mabes/detail';
import MabesEdit from './pages/assignment/mabes/edit';
import MabesDetailAction from './pages/assignment/mabes/detail/action';
import Absence from './pages/absence';
import AbsenceList from './pages/absence/list';
import AbsenceIn from './pages/absence/scan/in';
import AbsenceOut from './pages/absence/scan/out';
import DetailTapper from './pages/absence/tapper';
import Weighing from './pages/weighing';
import AddBalanced from './pages/balanced/add';
import DetailWeighing from './pages/weighing/mandor/detail';
import WeighingTapper from './pages/weighing/mandor/tapper';
import WeighingScan from './pages/weighing/mandor/detail/scan';
import Logistic from './pages/logistic';
import LogisticDetail from './pages/logistic/detail';
import LogisticLoading from './pages/logistic/loading';
import LogisticShipment from './pages/logistic/shipment';
import LogisticScan from './pages/logistic/scan';
import LogisticShipmentDetail from './pages/logistic/shipment/detail';
import Warehouse from './pages/warehouse';
import Storybook from './pages/storybook';
import React from 'react';
import { useSelector } from 'react-redux';
import Toast from './components/ui/Toast';
import { hideToast } from './store/actions/uiAction';

export default function Router() {
  const toastState = useSelector(({ toast }) => toast);

  return (
    <>
      <Toast isShow={toastState.show} text={toastState.message} onClose={hideToast} isSuccess={!toastState.isError} />
      <BrowserRouter>
        <RouteGuard loginPath="/auth/login" homePath="/homepage">
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            {/* later add condition for auth */}
            <Route path="/auth/login" element={<SignIn />} />
            <Route path="/homepage" element={<HomePage />} />

            {/* penugasan */}
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/assignment/detail/:id/accept" element={<MandorAcceptAssignment />} />
            <Route path="/assignment/detail/:id/diversion" element={<MandorDiversionAssignment />} />
            <Route path="/assignment/tapper/:id" element={<TapperPlanning />} />

            <Route path="/assignment/add" element={<MabesAssignment />} />
            <Route path="/assignment/detail/:id" element={<MabesDetail />} />
            <Route path="/assignment/detail/:id/edit" element={<MabesEdit />} />
            <Route path="/assignment/detail/action" element={<MabesDetailAction />} />

            {/* absensi */}
            <Route path="/absence" element={<Absence />} />
            <Route path="/absence/:id_tugas" element={<AbsenceList />} />
            <Route path="/absence/:id_tugas/in" element={<AbsenceIn />} />
            <Route path="/absence/:id_tugas/out" element={<AbsenceOut />} />
            <Route path="/absence/tapper/:id" element={<DetailTapper />} />

            {/* penimbangan */}
            <Route path="/weighing" element={<Weighing />} />
            <Route path="/weighing/add" element={<AddBalanced />} />
            <Route path="/weighing/detail/:id" element={<DetailWeighing />} />
            <Route path="/weighing/detail/:id/tapper/:id_tapper" element={<WeighingTapper />} />
            <Route path="/weighing/detail/:id/scan" element={<WeighingScan />} />

            {/* pengiriman */}
            <Route path="/logistic" element={<Logistic />} />
            <Route path="/logistic/detail/:id" element={<LogisticDetail />} />
            <Route path="/logistic/loading/:id" element={<LogisticLoading />} />
            <Route path="/logistic/shipment/:id/" element={<LogisticShipment />} />
            <Route path="/logistic/shipment/:id/scan" element={<LogisticScan />} />
            <Route path="/logistic/shipment/detail/:id/" element={<LogisticShipmentDetail />} />

            {/* gudang */}
            <Route path="/warehouse" element={<Warehouse />} />

            {/* misc */}
            <Route path="/storybook" element={<Storybook />} />
            <Route path="*" element={<div className="flex justify-center p-10">Route not found</div>} />
          </Routes>
        </RouteGuard>
      </BrowserRouter>
    </>
  );
}
