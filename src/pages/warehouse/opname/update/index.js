import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/button/Button';
import Title from '../../../../components/title/Title';
import Header from '../../../../components/ui/Header';
import Cookies from 'universal-cookie';
import Toast from '../../../../components/ui/Toast';
import DropDown from '../../../../components/forms/Dropdown';
import FlatButton from '../../../../components/button/flat';
import Divider from '../../../../components/ui/Divider';
import axios from 'axios';
// import FlatButton from '../../../../../../../../components/button/flat';

const url = process.env.REACT_APP_API_URL;

function WarehouseOpnameUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [photos, setPhotos] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [opnameDetail, setOpnameDetail] = React.useState([]);
  const [payload, setPayload] = React.useState({});
  const [isEditWet, setIsEditWet] = React.useState(false);
  const [isEditDrc, setIsEditDrc] = React.useState(false);
  const [isEditDry, setIsEditDry] = React.useState(false);

  React.useEffect(() => {
    getOpnameDetail();

    const data_dummy = [
      {
        id: '4e2de4f3-3d6d-4118-ad08-380a98f23911',
        kode: 'WH1-G1.001/10-14/P1',
        total_wet: 100,
        drc: 50,
        total_dry: 10,
        foto: [],
      },
    ];
    setOpnameDetail(data_dummy[0]);
  }, []);

  const getOpnameDetail = () => {
    axios
      .get(`${url}warehouse/scan-by-stock-kode?identifier=${'4e2de4f3-3d6d-4118-ad08-380a98f23911'}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
      })
      .catch((error) => {
        console.error(error.message);
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
    await axios
      .put(
        `${url}warehouse/stock-in/update/${id}
        `,
        payload,
        config
      )
      .then(() => {
        setIsSubmitted(true);
        setIsButtonDisabled(true);
        setTimeout(() => {
          setIsButtonDisabled(false);
          setIsSubmitted(false);
          navigate(`/warehouse`);
        }, 3000);
      });
  };

  return (
    <>
      <div className="header">
        <Header title="Update Kondisi Stock" isWithBack />
      </div>
      <div className="container">
        <Title text="WH1-G1.001/02-12/P1" />
        <div className="flex justify-between my-5 gap-3">
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">Wet</p>
            <p className="text-4xl font-bold">{opnameDetail?.total_wet}</p>
          </div>
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">DRC</p>
            <p className="text-4xl font-bold">{opnameDetail?.drc} %</p>
          </div>
          <div className="p-3 rounded-xl border border-cloud w-full">
            <p className="text-xxs mb-3">Dry</p>
            <p className="text-4xl font-bold">{opnameDetail?.total_dry}</p>
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
                  className="rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  min="0"
                  defaultValue={opnameDetail?.total_wet}
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
                  className="rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  min="0"
                  defaultValue={opnameDetail?.drc}
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
                  className="rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  min="0"
                  defaultValue={opnameDetail?.total_dry}
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
        <Toast text={'Sukses mengupdate data!'} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
      </div>
    </>
  );
}

export default WarehouseOpnameUpdate;
