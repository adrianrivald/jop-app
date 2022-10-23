import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../../../components/button/Button';
import DatePicker from '../../../../../components/forms/DatePicker';
import DropDown from '../../../../../components/forms/Dropdown';
import Title from '../../../../../components/title/Title';
import Divider from '../../../../../components/ui/Divider';
import Header from '../../../../../components/ui/Header';
import { capitalize } from '../../../../../utils/strings';

const url = process.env.REACT_APP_API_URL;

function WarehouseCIDetailNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [shipmentDetail, setShipmentDetail] = React.useState({});
  const [photos, setPhotos] = React.useState([]);
  const [payload, setPayload] = React.useState({});

  React.useEffect(() => {
    getShipmentDetail();
  }, []);

  const getShipmentDetail = () => {
    axios
      .get(`${url}pengiriman/scan-by-uuid?identifier=${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setShipmentDetail(data);
        const joinedPhotos = data?.loading?.map((res) => res.foto);
        setPhotos(joinedPhotos);
      });
  };

  return (
    <>
      <div className="header">
        <Header title="Detail Pengiriman" isWithBack />
      </div>
      <div className="container">
        <div>
          <div className="flex justify-between items-center font-bold">
            <p className="text-sun">Pengiriman ke- {shipmentDetail?.trip_ke}</p>
            <p className="text-sun">{capitalize(shipmentDetail?.status_pengiriman)}</p>
          </div>
          <p className="text-xxs mt-1">{shipmentDetail?.tanggal_pengiriman}</p>
          <p className="font-bold">{shipmentDetail?.kode_pengiriman}</p>
          {shipmentDetail?.loading?.map((res, idx) => (
            <p className="text-xxs">
              {res?.nama_produk} – {res?.berat} kg (wet)
            </p>
          ))}
        </div>
        <Divider />
        <div>
          <p className="text-sm font-bold">Detail Pengiriman</p>
          <div className="flex gap-3 my-1">
            <p className="w-2/4">Jenis Logistik</p>
            <p className="w-2/4 font-bold">
              {shipmentDetail?.jenis_logistik} ({shipmentDetail?.total_berat} kg)
            </p>
          </div>
          <div className="flex gap-3 my-1">
            <p className="w-2/4">Armada</p>
            <p className="w-2/4 font-bold">{shipmentDetail?.plat_nomor_armada}</p>
          </div>
          <div className="flex gap-3 my-1">
            <p className="w-2/4">Alamat / fasilitas tujuan</p>
            <div className="w-2/4 ">
              <p className="font-bold">{shipmentDetail?.tujuan}</p>
              <p className="font-bold">WH1 - G1</p>
            </div>
          </div>
          <div className="flex gap-3 my-1">
            <p className="w-2/4">Supir / pengendara</p>
            <div className="w-2/4 ">
              <p className="font-bold">
                {shipmentDetail?.supir?.nama} / {shipmentDetail?.supir?.kode}
              </p>
              <p className="font-bold">{shipmentDetail?.supir?.skema}</p>
            </div>
          </div>
          <div className="flex gap-3 my-1">
            <p className="w-2/4">Pengawal</p>
            <div className="w-2/4 ">
              <p className="font-bold">
                {shipmentDetail?.pengawal?.nama} / {shipmentDetail?.pengawal?.kode}
              </p>
              <p className="font-bold">{shipmentDetail?.pengawal?.skema}</p>
            </div>
          </div>
          <div className="photo-area mt-3">
            <div className="photos-container overflow-x-auto flex gap-3">
              {photos?.map((res, idx) => (
                <img width="200" alt={`photo_${idx + 1}`} src={res} className="rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        <div className="button-area flex mt-12 gap-2">
          <Button isText isBack text="Kembali" className="w-full" onClick={() => navigate('/warehouse')} />
          <Button isText text="Timbang Ulang" className="w-full" onClick={() => navigate('rescale')} />
        </div>
      </div>
    </>
  );
}

export default WarehouseCIDetailNew;
