import React from 'react';
import Header from '../../../../components/ui/Header';
import DropDown from '../../../../components/forms/Dropdown';
import DatePicker from '../../../../components/forms/DatePicker';
import FlatButton from '../../../../components/button/flat';
import TimePicker from '../../../../components/forms/TimePicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Joi from 'joi';
import { showToast } from '../../../../store/actions/uiAction';

const SCHEMA = Joi.object({
  divisi_id: Joi.string().uuid().label('Divisi').required(),
  field_id: Joi.string().uuid().label('Area/block').required(),
  hancak_id: Joi.string().uuid().label('Hancak').required(),
  jenis_tugas_id: Joi.string().uuid().label('Jenis tugas').required(),
  mandor_id: Joi.string().uuid().label('Penanggung jawab tugas/Mandor').required(),
  sistem_id: Joi.string().uuid().label('Sistem').required(),
  wilayah_tugas_id: Joi.string().uuid().label('Wilayah tugas').required(),
  tanggal_tugas: Joi.string()
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3])\:([0-5][0-9])$/, {
      name: 'YYYY-MM-DD HH:mm:ss',
    })
    .label('Tanggal & Waktu tugas')
    .required(),
  is_recurring: Joi.number().min(0).max(1).label('Ulangi tugas').required(),
  tipe_recurring: Joi.string().label('Tipe ulangi').when('is_recurring', {
    is: 1,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  batas_recurring: Joi.string()
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
      name: 'YYYY-MM-DD',
    })
    .label('Batas pengulangan')
    .when('is_recurring', {
      is: 1,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
});

function Dropdown(props) {
  return (
    <div className={`mt-5 ${props.customClass}`}>
      <h2 className="text-left mb-1 font-bold">{props.title}</h2>
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

function MabesAssignment() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [estateList, setEstateList] = React.useState([]);
  const [taskList, setTaskList] = React.useState([]);
  const [sistemList, setSistemList] = React.useState([]);
  const [divisiList, setDivisiList] = React.useState([]);
  const [hancakList, setHancakList] = React.useState([]);
  const [areaList, setAreaList] = React.useState([]);
  const [mandorList, setMandorList] = React.useState([]);
  const [addInput, setAddInput] = React.useState({});
  const [dateTimeInput, setDateTimeInput] = React.useState({});
  const [isRecurring, setIsRecurring] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [clone, setClone] = React.useState('');

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
    getEstate();
    getTask();
    getArea();
    // // getDivisi();
    // // getHancak();
    getMandor();
    getSistem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (addInput.wilayah_tugas_id) {
      getDivisi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addInput.wilayah_tugas_id]);

  React.useEffect(() => {
    if (addInput.divisi_id) {
      getHancak();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addInput.divisi_id]);

  React.useEffect(() => {
    if (addInput.wilayah_tugas_id) {
      getDivisi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addInput.wilayah_tugas_id]);

  React.useEffect(() => {
    if (addInput.divisi_id) {
      getHancak();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addInput.divisi_id]);

  const getTask = () => {
    try {
      axios
        .get('/jenis-tugas/list', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          const data = res?.data?.data?.data;
          const taskData = data?.map((res) => ({
            value: res.id,
            label: res.nama,
          }));
          setTaskList(taskData);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getEstate = () => {
    axios
      .get('/wilayah-tugas/list', {
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

  const getDivisi = () => {
    axios
      .get(`/divisi/by-wilayah-tugas/${addInput.wilayah_tugas_id}?include=wilayah_tugas`, {
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

  const getHancak = () => {
    axios
      .get(`/hancak/by-divisi/${addInput.divisi_id}?include=divisi`, {
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
      .get('/field/list', {
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
      .get(`/penugasan/list-mandor`, {
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

  const getSistem = () => {
    axios
      .get(`/sistem/list`, {
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

  const getClone = (id) => {
    axios
      .get(`/field/by-uuid/${id}?include=clone`, {
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

  const handleSubmit = async () => {
    try {
      await SCHEMA.validateAsync({
        ...addInput,
        is_recurring: isRecurring ? 1 : 0,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      };
      axios
        .post(
          `/penugasan/store`,
          {
            ...addInput,
            is_recurring: isRecurring === true ? 1 : 0,
          },
          config
        )
        .then((res) => {
          showToast({
            message: 'Sukses menambahkan data !',
          });
          setIsButtonDisabled(true);
          setTimeout(() => {
            setIsButtonDisabled(false);
            setIsSubmitted(false);
            navigate('/assignment');
          }, 3000);
        });
    } catch (err) {
      showToast({
        message: err.message,
        isError: true,
      });
    }
  };
  const onChangeDate = (e) => {
    setDateTimeInput({
      ...dateTimeInput,
      date: e.target.value,
    });

    setAddInput({
      ...addInput,
      tanggal_tugas: `${e.target.value}` + ` ${addInput?.tanggal_tugas ? addInput?.tanggal_tugas.split(' ')[1] : ''}`,
    });
  };

  const onChangeTime = (e) => {
    setDateTimeInput({
      ...dateTimeInput,
      time: e.target.value,
    });

    setAddInput({
      ...addInput,
      tanggal_tugas: `${addInput?.tanggal_tugas ? addInput?.tanggal_tugas.split(' ')[0] : ''}` + ` ${e.target.value}`,
    });
  };

  return (
    <>
      <div className="header">
        <Header title="Penugasan" isWithBack to="/assignment" />
      </div>
      <div className="container">
        <div>
          <Dropdown
            title="Wilayah tugas"
            defaultValue="Pilih wilayah tugas"
            customClass={'mt-0'}
            option={estateList}
            onChange={(e) => onChangeHandler(e, 'wilayah_tugas_id')}
          />
          <Dropdown
            title="Divisi"
            defaultValue="Pilih divisi"
            option={divisiList}
            onChange={(e) => onChangeHandler(e, 'divisi_id')}
          />
          <Dropdown
            title="Hancak"
            defaultValue="Pilih hancak"
            option={hancakList}
            onChange={(e) => onChangeHandler(e, 'hancak_id')}
          />
          <Dropdown
            title="Area/block"
            defaultValue="Pilih area"
            option={areaList}
            onChange={(e) => onChangeHandler(e, 'field_id')}
          />
          <Dropdown
            title="Jenis tugas"
            defaultValue="Pilih jenis tugas"
            option={taskList}
            onChange={(e) => onChangeHandler(e, 'jenis_tugas_id')}
          />
          <Dropdown
            title="Penanggung jawab tugas / Mandor"
            defaultValue="Pilih penanggung jawab"
            option={mandorList}
            onChange={(e) => onChangeHandler(e, 'mandor_id')}
          />
          <div className="flex justify-between gap-2 mt-5">
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Clone</h2>
              <p className="font-bold mt-2.5">{clone}</p>
            </div>
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Sistem</h2>
              <DropDown
                defaultValue="Pilih sistem"
                onChange={(e) => onChangeHandler(e, 'sistem_id')}
                option={sistemList}
              />
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-5">
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Tanggal Tugas</h2>
              <DatePicker onChange={(e) => onChangeDate(e)} />
            </div>
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Waktu Tugas</h2>
              <TimePicker onChange={(e) => onChangeTime(e)} />
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
                defaultValue="Pilih ulangi tugas"
                onChange={(e) => onChangeHandler(e, 'tipe_recurring')}
                option={recurringList}
              />
            </div>
            <div className="flex-auto w-64">
              <h2 className="text-left mb-1">Batas Pengulangan</h2>
              <DatePicker disabled={!isRecurring} onChange={(e) => onChangeHandler(e, 'batas_recurring')} />
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
        </div>
      </div>
    </>
  );
}

export default MabesAssignment;
