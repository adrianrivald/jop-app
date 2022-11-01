import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../components/button/Button';
import SubmitButton from '../../../components/button/submit';
import Title from '../../../components/title/Title';
import Divider from '../../../components/ui/Divider';
import Header from '../../../components/ui/Header';
import Modal from '../../../components/ui/Modal';
import Toast from '../../../components/ui/Toast';
import { capitalize } from '../../../utils/strings';

const url = process.env.REACT_APP_API_URL;

function LogisticDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [batchDetail, setBatchDetail] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isDoneModal, setIsDoneModal] = React.useState(false);
  const logistic_payload = JSON.parse(localStorage.getItem('logistic_payload'));

  React.useEffect(() => {
    if (logistic_payload?.lokasi === 'tph') {
      getBatchDetail();
    } else {
      getBatchDetailWh();
    }
    localStorage.removeItem('shipment_payload');
    localStorage.removeItem('scan_type');
    localStorage.removeItem('supir_data');
    localStorage.removeItem('pengawal_data');
    localStorage.removeItem('loaded_data');
  }, []);

  const getBatchDetailWh = () => {
    axios
      .get(`${url}/pengiriman/stock-sales/detail/${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setBatchDetail(data);
      });
  };

  const getBatchDetail = () => {
    axios
      .get(`${url}/pengiriman/detail-batch/${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setBatchDetail(data);
      });
  };

  const onClickBatch = (id, weight, remain_weight, code, name, batchCode) => {
    localStorage.setItem(
      'batch_item',
      JSON.stringify({
        weight,
        remain_weight,
        code,
        name,
        batchCode,
      })
    );
    navigate(`/logistic/loading/${id}`);
  };

  const handleDeliver = () => {
    if (!isButtonDisabled || !localStorage.getItem('delivered')) {
      localStorage.setItem(
        'loaded_data',
        JSON.stringify({
          detail: batchDetail?.detail,
          kode: batchDetail?.kode,
          loading_id: batchDetail?.loading?.id,
          client: batchDetail?.client,
        })
      );
      navigate(`/logistic/shipment/${id}`);
    }
  };

  const onClickShipment = (id, index) => {
    localStorage.setItem('shipment_index', index);
    navigate(`/logistic/shipment/detail/${id}`);
  };

  const handleDone = () => {
    if (!isButtonDisabled || !localStorage.getItem('delivered')) {
      if (logistic_payload?.lokasi === 'tph') {
        axios
          .get(`${url}/pengiriman/batch/done/${id}`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          })
          .then((res) => {
            setIsDoneModal(false);
            setIsSubmitted(true);
            setIsButtonDisabled(true);
            setTimeout(() => {
              setIsButtonDisabled(false);
              setIsSubmitted(false);
              navigate('/logistic');
            }, 3000);
          });
      } else {
        axios
          .get(`${url}/pengiriman/stock/done/${id}`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          })
          .then((res) => {
            setIsDoneModal(false);
            setIsSubmitted(true);
            setIsButtonDisabled(true);
            setTimeout(() => {
              setIsButtonDisabled(false);
              setIsSubmitted(false);
              navigate('/logistic');
            }, 3000);
          });
      }
    }
  };

  const handleBack = () => {
    localStorage.removeItem('delivered');
  };

  const disabledForDeliver = () => {
    // isButtonDisabled || localStorage.getItem('delivered') === null
    // ? false
    // : true || batchDetail?.loading?.length === 0
    // ? true
    // : false

    if (isButtonDisabled) {
      return true;
    }

    if (localStorage.getItem('delivered')) {
      return true;
    }

    if (batchDetail?.loading?.length === 0) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className="header">
        <Header title="Logistik" isWithBack moreAction={handleBack} />
      </div>
      <div className="container">
        <div className="flex justify-between">
          <div>
            <p>Kode Kelompok Barang</p>
            <p className="font-bold">{batchDetail?.kode}</p>
          </div>
          <div>
            <p>Total Berat Barang</p>
            <p className="font-bold">{batchDetail?.total_berat} kg</p>
          </div>
        </div>
        <Divider />
        <div className="my-5">
          {batchDetail?.detail?.map((res, idx) => (
            <div className="detail my-3" key={idx}>
              <div className="flex justify-between items-center">
                <div>
                  <span>{res?.nama}</span> -{' '}
                  <span>
                    <b>{res?.berat_kirim} kg</b> / {res?.berat_total} kg
                  </span>
                  <p>
                    {batchDetail?.kode}/{res?.kode}
                  </p>
                </div>
                <div>
                  <Button
                    disabled={localStorage.getItem('delivered') === null ? false : true}
                    className="text-xs w-16"
                    isText
                    text="Load"
                    onClick={() =>
                      onClickBatch(res?.id, res?.berat_total, res?.berat_sisa, res?.kode, res?.nama, batchDetail?.kode)
                    }
                  />
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
        <div className="batch-delivered">
          <p className="font-bold mb-4">List Pengiriman</p>
          {batchDetail?.kirim?.length > 0 ? (
            batchDetail?.kirim?.map((res, idx) => (
              <div className="cursor-pointer" onClick={() => onClickShipment(res?.id, idx + 1)} key={idx}>
                <p>Pengiriman ke - {idx + 1}</p>
                <p className="font-bold">{res?.kode}</p>
                {res?.detail?.map((res, idx) => (
                  <div className="my-2" key={idx}>
                    <p>
                      LOAD {idx + 1} : {res?.nama} - {res?.berat_kirim} kg
                    </p>
                    <div className="flex justify-between">
                      <p className="font-bold">
                        {batchDetail?.kode} / <span className="text-sun">{res?.kode}</span>
                      </p>
                      <p className="font-bold">{capitalize(res?.nama)}</p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center gap-3 mt-4">
                  <div className="flex justify-end	rounded-md bg-white p-1 gap-px w-2/4 h-8">
                    {res?.detail?.map((res, idx) => (
                      <div
                        className={`${idx === 0 ? 'rounded-l-md' : ''} ${
                          res?.kode === 'P1'
                            ? 'bg-coal'
                            : res?.kode === 'P2'
                            ? 'bg-flora'
                            : res?.kode === 'P3'
                            ? 'bg-cloud'
                            : 'bg-leaf'
                        } h-6`}
                        style={{ width: `${res?.berat_kirim}rem` }}
                        key={idx}
                      />
                    ))}
                    <div
                      className={`rounded-r-md bg-earth h-6`}
                      style={{
                        width: `${
                          batchDetail?.total_berat -
                          res?.detail.reduce((accumulator, b) => accumulator + (b['berat_kirim'] || 0), 0)
                        }rem`,
                      }}
                    />
                  </div>
                  <div>
                    <p>{moment(res?.created_at, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')}</p>
                    <p className="text-md font-bold">{res?.kode_armada}</p>
                  </div>
                  <p className="flex-auto text-right text-sun font-bold">{capitalize(res?.status_pengiriman)}</p>
                </div>
                <Divider />
              </div>
            ))
          ) : (
            <div className="flex justify-center p-10">Belum ada pengiriman</div>
          )}
        </div>
        <div className="submit-area mt-11">
          <Button
            disabled={disabledForDeliver()}
            isText
            text="Deliver"
            className="w-full text-md"
            onClick={handleDeliver}
          />
          <Button
            disabled={isButtonDisabled || localStorage.getItem('delivered') === null ? false : true}
            isText
            text="Done"
            role="white"
            className="mt-2 w-full text-md"
            onClick={() => setIsDoneModal(true)}
          />
        </div>
        <Toast text="Pengiriman telah diselesaikan !" onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
        {isDoneModal ? (
          <Modal onClose={() => setIsDoneModal(false)}>
            <Title text="Apakah kamu yakin ingin menyelesaikan pengiriman?" />
            <div className="flex justify-between items-center gap-3 mt-5">
              <Button isText isBack text="Kembali" className="w-full" onClick={() => setIsDoneModal(false)} />
              <Button isText text="Konfirmasi" className="w-full" onClick={handleDone} />
            </div>
          </Modal>
        ) : null}
      </div>
    </>
  );
}

export default LogisticDetail;
