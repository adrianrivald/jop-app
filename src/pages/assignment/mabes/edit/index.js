import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Header from '../../../../components/ui/Header';
import DropDown from '../../../../components/forms/Dropdown';
import DatePicker from '../../../../components/forms/DatePicker';
import FlatButton from '../../../../components/button/flat';
import TimePicker from '../../../../components/forms/TimePicker';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Toast from '../../../../components/ui/Toast';

const url = process.env.REACT_APP_API_URL;

function Dropdown(props) {
  return (
    <div className={`mt-5 ${props.customClass}`}>
      <h2 className={`text-left mb-1 ${props.isSwitch ? 'text-sun' : ''}`}>{props.title}</h2>
      <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
    </div>
  );
}

function CheckIsRecurring(props) {
  return (
    <input
      checked={props.checked}
      onClick={props.onChange}
      type="checkbox"
      className="accent-flora w-4 h-4 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"
    />
  );
}

function MabesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const isSwitch = params.get('isSwitch');
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [detailData, setDetailData] = React.useState({});
  // const [workerList, setWorkerList] = React.useState([])
  const [estateList, setEstateList] = React.useState([]);
  const [taskList, setTaskList] = React.useState([]);
  const [sistemList, setSistemList] = React.useState([]);
  const [divisiList, setDivisiList] = React.useState([]);
  const [hancakList, setHancakList] = React.useState([]);
  const [areaList, setAreaList] = React.useState([]);
  const [mandorList, setMandorList] = React.useState([]);
  const [dateTimeInput, setDateTimeInput] = React.useState({});
  const [addInput, setAddInput] = React.useState({});
  const [isRecurring, setIsRecurring] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [clone, setClone] = React.useState('');
  const [currentMandor, setCurrentMandor] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const recurringList = [
    {
      value: 'harian',
      label: 'Harian',
    },
    {
      value: 'mingguan',
      label: 'Mingguan',
    },
    {
      value: 'bulanan',
      label: 'Bulanan',
    },
  ];

  React.useEffect(() => {
    getDetail();
    getEstate();
    getTask();
    getArea();
    // getDivisi();
    // getHancak();
    getMandor();
    getSistem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetail = () => {
    axios
      .get(
        `${url}penugasan/detail/${id}?include=wilayah_tugas,jenis_tugas,divisi,hancak,field,clone,sistem,mandor,pekerja.skema_kerja`,
        {
          url: process.env.REACT_APP_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        setDetailData(data);
        // setWorkerList(data.pekerja)
        setAddInput({
          wilayah_tugas_id: data?.wilayah_tugas?.id,
          divisi_id: data?.divisi?.id,
          hancak_id: data?.hancak?.id,
          field_id: data?.field?.id,
          jenis_tugas_id: data?.jenis_tugas?.id,
          mandor_id: data?.mandor?.id,
          sistem_id: data?.sistem?.id,
          tanggal_tugas: data?.tanggal_tugas,
          is_recurring: data?.is_recurring,
          tipe_recurring: data?.tipe_recurring,
          batas_recurring: data?.batas_recurring,
        });
        setCurrentMandor(data?.mandor?.id);
        getDivisi(data?.wilayah_tugas?.id);
        getHancak(data?.divisi?.id);
        getClone(data?.field?.id);
        if (data?.is_recurring === 1) {
          setIsRecurring(true);
        }
      });
  };

  const getSistem = () => {
    axios
      .get(`${url}sistem/list`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const sistemData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setSistemList(sistemData);
      });
  };

  const getTask = () => {
    axios
      .get('https://jop.dudyali.com/api/v1/jenis-tugas/list', {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const taskData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setTaskList(taskData);
      });
  };

  const getEstate = () => {
    axios
      .get('https://jop.dudyali.com/api/v1/wilayah-tugas/list', {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const estateData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setEstateList(estateData);
      });
  };

  const getDivisi = (id) => {
    axios
      .get(`${url}divisi/by-wilayah-tugas/${id}?include=wilayah_tugas`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const divisiData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setDivisiList(divisiData);
      });
  };

  const getHancak = (id) => {
    axios
      .get(`${url}hancak/by-divisi/${id}?include=divisi`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const hancakData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setHancakList(hancakData);
      });
  };

  const getArea = () => {
    axios
      .get('https://jop.dudyali.com/api/v1/field/list', {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const areaData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setAreaList(areaData);
      });
  };

  const getMandor = () => {
    axios
      .get('https://jop.dudyali.com/api/v1/penugasan/list-mandor', {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const mandorData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setMandorList(mandorData);
      });
  };

  const onChangeHandler = (e, input_id) => {
    if (input_id === 'is_recurring') {
      setIsRecurring(e.target.checked);
    }
    setAddInput((prev) => ({
      ...prev,
      [input_id]: e.target.value,
    }));
    if (input_id === 'field_id') {
      getClone(e.target.value);
    }
  };
  const onChangeDate = (e) => {
    setDateTimeInput({
      ...dateTimeInput,
      date: e.target.value,
    });

    setAddInput({
      ...addInput,
      tanggal_tugas: `${e.target.value}` + ` ${addInput.tanggal_tugas.split(' ')[1]}`,
    });
  };

  const onChangeTime = (e) => {
    setDateTimeInput({
      ...dateTimeInput,
      time: e.target.value,
    });

    setAddInput({
      ...addInput,
      tanggal_tugas: `${addInput.tanggal_tugas.split(' ')[0]}` + ` ${e.target.value}`,
    });
  };

  const getClone = (id) => {
    axios
      .get(`${url}field/by-uuid/${id}?include=clone`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setClone(data.clone.nama);
      });
  };

  const handleSubmit = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
    try {
      if ((isSwitch === 'true' && addInput.mandor_id !== currentMandor) || !isSwitch) {
        axios
          .put(
            `${url}penugasan/update/${id}`,
            {
              ...addInput,
              is_recurring: isRecurring === true ? 1 : 0,
            },
            config
          )
          .then((res) => {
            setIsSuccess(true);
            setAlertMessage('Sukses mengubah data !');
            setIsButtonDisabled(true);
            setIsSubmitted(true);
            setTimeout(() => {
              setIsButtonDisabled(false);
              setIsSubmitted(false);
              navigate(`/assignment/detail/${id}`);
            }, 3000);
          });
      } else {
        setIsSuccess(false);
        setAlertMessage('Mandor belum dialhikan, silakan ganti mandor');
        setIsError(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      setIsSuccess(false);
      setAlertMessage('Gagal update data');
      setIsError(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="header">
        <Header title="Penugasan" isWithBack />
      </div>
      <div className="container">
        <div>
          <Dropdown
            customClass="mt-0"
            title="Pilih wilayah tugas"
            option={estateList}
            onChange={(e) => onChangeHandler(e, 'wilayah_tugas_id')}
            defaultValue={detailData?.wilayah_tugas?.nama}
          />
          <Dropdown
            title="Divisi"
            option={divisiList}
            onChange={(e) => onChangeHandler(e, 'divisi_id')}
            defaultValue={detailData?.divisi?.nama}
          />
          <Dropdown
            title="Hancak"
            option={hancakList}
            onChange={(e) => onChangeHandler(e, 'hancak_id')}
            defaultValue={detailData?.hancak?.nama}
          />
          <Dropdown
            title="Area/block"
            option={areaList}
            onChange={(e) => onChangeHandler(e, 'field_id')}
            defaultValue={detailData?.field?.nama}
          />
          <Dropdown
            title="Pilih jenis tugas"
            option={taskList}
            onChange={(e) => onChangeHandler(e, 'jenis_tugas_id')}
            defaultValue={detailData?.jenis_tugas?.nama}
          />
          <Dropdown
            title="Pilih penanggung jawab tugas / Mandor"
            option={mandorList}
            onChange={(e) => onChangeHandler(e, 'mandor_id')}
            defaultValue={detailData?.mandor?.nama}
            isSwitch={isSwitch}
          />
          <div className="flex justify-between gap-2 mt-5">
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Clone</h2>
              <p className="font-bold mt-2.5">{clone}</p>
            </div>
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Sistem</h2>
              <DropDown
                onChange={(e) => onChangeHandler(e, 'sistem_id')}
                option={sistemList}
                defaultValue={detailData?.sistem?.nama}
              />
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-5">
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Tanggal Tugas</h2>
              {detailData?.tanggal_tugas && (
                <DatePicker
                  defaultValue={moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm').format('YYYY-MM-DD') ?? ''}
                  onChange={(e) => onChangeDate(e)}
                />
              )}
            </div>
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Waktu Tugas</h2>
              {detailData?.tanggal_tugas && (
                <TimePicker
                  defaultValue={moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm').format('hh:mm') ?? ''}
                  onChange={(e) => onChangeTime(e)}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-5">
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1 flex items-center gap-2">
                Ulangi Tugas
                <CheckIsRecurring checked={isRecurring} onChange={(e) => onChangeHandler(e, 'is_recurring')} />
              </h2>
              <DropDown
                disabled={!isRecurring}
                defaultValue={detailData?.tipe_recurring}
                onChange={(e) => onChangeHandler(e, 'tipe_recurring')}
                option={recurringList}
              />
            </div>
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Batas Pengulangan</h2>
              <DatePicker
                disabled={!isRecurring}
                defaultValue={moment(detailData?.batas_recurring, 'YYYY-MM-DD hh:mm').format('YYYY-MM-DD') ?? ''}
                onChange={(e) => onChangeHandler(e, 'batas_recurring')}
              />
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-11">
            <FlatButton
              className="w-6/12 rounded-xl"
              role="white"
              text="Kembali"
              onClick={() => navigate(-1)}
              disabled={isButtonDisabled}
            />
            <FlatButton
              className="w-6/12 rounded-xl"
              role="green"
              text="Buat"
              onClick={handleSubmit}
              disabled={isButtonDisabled}
            />
          </div>
          <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} isSuccess={isSuccess} />
          <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isError} isSuccess={false} />
        </div>
      </div>
    </>
  );
}

export default MabesEdit;
