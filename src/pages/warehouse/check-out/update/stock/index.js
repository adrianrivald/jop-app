import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../../components/button/Button';
import Title from '../../../../../components/title/Title';
import Header from '../../../../../components/ui/Header';
import Cookies from 'universal-cookie';
import Toast from '../../../../../components/ui/Toast';
import DropDown from '../../../../../components/forms/Dropdown';
import FlatButton from '../../../../../components/button/flat';
import Divider from '../../../../../components/ui/Divider';
import axios from 'axios';
// import FlatButton from '../../../../../../../../../../components/button/flat';

const url = process.env.REACT_APP_API_URL;

function WarehouseCOStockUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [photos, setPhotos] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [stockInDetail, setStockInDetail] = React.useState([]);
  const [payload, setPayload] = React.useState({});
  const [isEditWet, setIsEditWet] = React.useState(false);
  const [isEditDrc, setIsEditDrc] = React.useState(false);
  const [isEditDry, setIsEditDry] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  React.useEffect(() => {
    getStockInDetail();
  }, []);

  const getStockInDetail = () => {
    axios
      .get(`${url}/warehouse/stock-in/detail/${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setStockInDetail(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const onEditWet = () => {
    setPayload((prev) => ({
      ...prev,
      mode: 'total_wet',
    }));
    setIsEditWet(true);
    setIsEditDrc(false);
    setIsEditDry(false);
  };

  const onEditDrc = () => {
    setPayload((prev) => ({
      ...prev,
      mode: 'drc',
    }));
    setIsEditWet(false);
    setIsEditDrc(true);
    setIsEditDry(false);
  };

  const onEditDry = () => {
    setPayload((prev) => ({
      ...prev,
      mode: 'total_dry',
    }));
    setIsEditWet(false);
    setIsEditDrc(false);
    setIsEditDry(true);
  };

  const onChangeHandler = (e) => {
    setPayload((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
    if (payload?.mode === 'total_wet' && payload?.value < stockInDetail?.total_dry) {
      setIsSubmitted(true);
      setIsSuccess(false);
      setIsButtonDisabled(true);
      setAlertMessage('Total wet tidak boleh lebih kecil dari total dry');
      setTimeout(() => {
        setIsButtonDisabled(false);
        setIsSubmitted(false);
      }, 3000);
    } else if (payload?.mode === 'total_dry' && payload?.value > stockInDetail?.total_wet) {
      setIsSubmitted(true);
      setIsSuccess(false);
      setIsButtonDisabled(true);
      setAlertMessage('Total dry tidak boleh lebih besar dari total wet');
      setTimeout(() => {
        setIsButtonDisabled(false);
        setIsSubmitted(false);
      }, 3000);
    } else if (payload?.mode === 'total_wet' && payload?.value === '0') {
      setIsSubmitted(true);
      setIsSuccess(false);
      setIsButtonDisabled(true);
      setAlertMessage('Total wet tidak boleh 0!');
      setTimeout(() => {
        setIsButtonDisabled(false);
        setIsSubmitted(false);
      }, 3000);
    } else {
      await axios
        .put(
          `${url}/warehouse/stock-in/update/${id}
            `,
          payload,
          config
        )
        .then(() => {
          setIsSuccess(true);
          setIsSubmitted(true);
          setIsButtonDisabled(true);
          setAlertMessage('Sukses mengupdate data!');
          setTimeout(() => {
            setIsButtonDisabled(false);
            setIsSubmitted(false);
            navigate(`/warehouse`);
          }, 3000);
        });
    }
  };

  return (
    <>
      <div className="header">
        <Header title="Update Kondisi Stock" isWithBack />
      </div>
      <div className="container">
        <Title text={stockInDetail?.kode} />
        <div className="flex justify-between my-5 gap-3">
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">Wet</p>
            <p className="text-4xl font-bold">{stockInDetail?.total_wet}</p>
          </div>
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">DRC</p>
            <p className="text-4xl font-bold">{stockInDetail?.drc} %</p>
          </div>
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">Dry</p>
            <p className="text-4xl font-bold">{stockInDetail?.total_dry}</p>
          </div>
        </div>
        <Divider />
        <div className="input-section">
          <div className="flex justify-between items-center my-2">
            <p className="font-bold">Total Wet</p>
            <div className="flex gap-3">
              <div className="relative">
                <span className="absolute inset-y-4 right-2">kg</span>
                <input
                  className={`rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline ${
                    isEditWet ? 'border border-flora' : ''
                  }`}
                  type="number"
                  min="0"
                  defaultValue={stockInDetail?.total_wet}
                  disabled={!isEditWet}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
              <Button className="text-xs w-16" isText text="Edit" onClick={onEditWet} />
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-bold">DRC</p>
            <div className="flex gap-3">
              <div className="relative">
                <span className="absolute inset-y-4 right-2">%</span>
                <input
                  className={`rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline ${
                    isEditDrc ? 'border border-flora' : ''
                  }`}
                  type="number"
                  min="0"
                  defaultValue={stockInDetail?.drc}
                  disabled={!isEditDrc}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>

              <Button className="text-xs w-16" isText text="Edit" onClick={onEditDrc} />
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="font-bold">Total Dry</p>
            <div className="flex gap-3">
              <div className="relative">
                <span className="absolute inset-y-4 right-2">kg</span>
                <input
                  className={`rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline ${
                    isEditDry ? 'border border-flora' : ''
                  }`}
                  type="number"
                  min="0"
                  defaultValue={stockInDetail?.total_dry}
                  disabled={!isEditDry}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
              <Button className="text-xs w-16" isText text="Edit" onClick={onEditDry} />
            </div>
          </div>
        </div>
        <div className="button-area flex mt-12 gap-2">
          <Button isText isBack text="Kembali" className="w-full" onClick={() => navigate(-1)} />
          <Button isText text="Simpan" className="w-full" onClick={handleSubmit} disabled={isButtonDisabled} />
        </div>
        <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} isSuccess={isSuccess} />
      </div>
    </>
  );
}

export default WarehouseCOStockUpdate;
