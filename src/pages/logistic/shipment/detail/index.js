import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../../components/button/Button';
import DatePicker from '../../../../components/forms/DatePicker';
import DropDown from '../../../../components/forms/Dropdown';
import Divider from '../../../../components/ui/Divider';
import Header from '../../../../components/ui/Header';

const url = process.env.REACT_APP_API_URL;

function LogisticShipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [shipmentData, setShipmentData] = React.useState([]);
  const [openedId, setOpenedId] = React.useState({});
  const shipmentIndex = localStorage.getItem('shipment_index');

  React.useEffect(() => {
    getShipmentDetail();
  }, []);

  const getShipmentDetail = () => {
    axios
      .get(`${url}pengiriman/detail-pengiriman/${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        console.log(data, 'resdata');
        setShipmentData(data);
      });
  };

  console.log(shipmentData, 'shipmentdata');

  const onExpand = (idx) => {
    setOpenedId({
      ...openedId,
      [`item_${idx}`]: true,
    });
  };

  const onCollapse = (idx) => {
    setOpenedId({
      ...openedId,
      [`item_${idx}`]: false,
    });
  };

  return (
    <>
      <div className="header">
        <Header title="Detail Pengiriman" isWithBack />
      </div>
      <div className="container">
        <div>
          <p>Pengiriman ke- {shipmentIndex}</p>
          <p className="font-bold">{shipmentData?.kode_pengiriman}</p>
        </div>
        <div className="load-detail">
          <div className="flex justify-between mt-3 gap-3">
            <div className="p-3 rounded-xl border border-cloud w-full">
              <p className="text-xxs">Jumlah pengiriman</p>
              <span className="text-4xl font-bold">{shipmentData?.jumlah_loading}</span>
            </div>
            <div className="p-3 rounded-xl border border-cloud w-full">
              <p className="text-xxs">Total berat produk</p>
              <span className="text-4xl font-bold">{shipmentData?.total_berat}</span>
              <span> kg</span>
            </div>
            <div className="p-3 rounded-xl border border-cloud w-full">
              <p className="text-xxs">Berat produk sisa</p>
              <span className="text-4xl font-bold">20</span>
              <span> kg</span>
            </div>
          </div>
          <Divider />
          <div className="">
            {shipmentData?.loading?.length > 0 ? (
              shipmentData?.loading?.map((res, idx) =>
                openedId[`item_${idx}`] === true ? (
                  <div className="bg-white p-3">
                    <div className="flex justify-between items-center text-sun">
                      <p>Load ke - {idx + 1}</p>
                      <p>{res?.status}</p>
                    </div>
                    <p className="text-xs">{moment(res?.date).format('dddd, DD MMMM YYYY, hh:mm')}</p>

                    <div
                      className="flex justify-between items-center mt-2 transition-transform cursor-pointer"
                      onClick={() => onCollapse(idx)}
                    >
                      <div>
                        <p className="font-bold">{res?.kode_produk}</p>
                        <span>
                          {res?.nama_produk} – {res?.berat} kg (wet)
                        </span>
                      </div>
                      <div className="cursor-pointer">
                        <svg
                          className="rotate-90"
                          width="7"
                          height="12"
                          viewBox="0 0 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002"
                            stroke="#A7A29A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className=" p-3 ">
                      <div className="flex gap-3 my-1">
                        <p className="w-2/4">Jenis Logistik</p>
                        <p className="w-2/4 font-bold">{shipmentData?.jenis_logistik}</p>
                      </div>
                      <div className="flex gap-3 my-1">
                        <p className="w-2/4">Armada</p>
                        <p className="w-2/4 font-bold">{shipmentData?.armada}</p>
                      </div>
                      <div className="flex gap-3 my-1">
                        <p className="w-2/4">Alamat / fasilitas tujuan</p>
                        <div className="w-2/4 ">
                          <p className="font-bold">{shipmentData?.tujuan}</p>
                          <p className="font-bold">{shipmentData?.gudang}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 my-1">
                        <p className="w-2/4">Supir / pengendara</p>
                        <div className="w-2/4 ">
                          <p className="font-bold">
                            {shipmentData?.supir?.nama} / {shipmentData?.supir?.kode}
                          </p>
                          <p className="font-bold">{shipmentData?.supir?.skema}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 my-1">
                        <p className="w-2/4">Pengawal</p>
                        <div className="w-2/4 ">
                          <p className="font-bold">
                            {shipmentData?.pengawal?.nama} / {shipmentData?.pengawal?.kode}
                          </p>
                          <p className="font-bold">{shipmentData?.pengawal?.skema}</p>
                        </div>
                      </div>
                      <div className="photo-area mt-3">
                        <div className="photos-container overflow-x-auto flex gap-3">
                          {/* {
                                transactionData?.foto?.map((res, idx) => {
                                    console.log(res,'ress')
                                    return(
                                        <img 
                                            width="200" 
                                            alt={`photo_${idx+1}`} 
                                            src={res}
                                            className="rounded-xl" />
                                    )
                                })
                            } */}
                          {res?.foto?.map((res, idx) => (
                            <img
                              width="200"
                              alt={`photo_${idx + 1}`}
                              // src={`${'https://jop.dudyali.com/storage/'}${res}`}
                              src={res}
                              // src={res}
                              className="rounded-xl"
                            />
                          ))}
                        </div>
                        {/* <input type="file" multiple onChange={onSelectPhoto} /> */}
                      </div>
                    </div>
                    <Divider />
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="flex justify-between items-center text-sun">
                      <p>Load ke - {idx + 1}</p>
                      <p>{res?.status}</p>
                    </div>
                    <p className="text-xs">{moment(res?.date).format('dddd, DD MMMM YYYY, hh:mm')}</p>

                    <div
                      className="flex justify-between items-center mt-2 transition-transform cursor-pointer"
                      onClick={() => onExpand(idx)}
                    >
                      <div>
                        <p className="font-bold">{res?.kode_produk}</p>
                        <span>
                          {res?.nama_produk} – {res?.berat} kg (wet)
                        </span>
                      </div>
                      <div className="cursor-pointer">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002"
                            stroke="#A7A29A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <Divider />
                  </div>
                )
              )
            ) : (
              <div className="flex justify-center">No Data</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LogisticShipmentDetail;
