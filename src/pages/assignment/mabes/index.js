import axios from 'axios';
import moment from 'moment';
import Header from '../../../components/ui/Header';
import Button from '../../../components/button/Button';
import Table from '../../../components/ui/Table';
import React from 'react';
import DropDown from '../../../components/forms/Dropdown';
import DatePicker from '../../../components/forms/DatePicker';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getAssignmentByMabes } from '../../../store/actions/assignmentAction';
import { useSelector } from 'react-redux';

const url = process.env.REACT_APP_API_URL;

function Dropdown(props) {
  return (
    <div className="mt-1 w-3/6">
      <h2 className="text-left text-xs mb-1">{props.title}</h2>
      <DropDown
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        option={props.option}
        disabled={props.disabled}
      />
    </div>
  );
}

function Mabes() {
  const { data: listData, fetching: listDataFetching } = useSelector(({ assignment_mabes }) => assignment_mabes);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [estateList, setEstateList] = React.useState([]);
  const [taskList, setTaskList] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [selectedEstate, setSelectedEstate] = React.useState('');
  const [selectedTask, setSelectedTask] = React.useState('');
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isNoFilter, setIsNoFilter] = React.useState(false);
  const mabes_state = JSON.parse(localStorage.getItem('mabes_state'));
  const sortOption = [
    {
      value: 'asc',
      label: 'Latest',
    },
    {
      value: 'desc',
      label: 'Oldest',
    },
  ];

  // React.useEffect(() => {
  //     setFilterCount(Object.keys(selectedFilter).length)
  // }, [selectedDate, selectedEstate, selectedFilter, selectedTask])

  const getList = (sort) => {
    if (listDataFetching) {
      return;
    }

    if (!selectedTask && !selectedEstate && !selectedDate) {
      setIsNoFilter(true);
    } else if (selectedTask || selectedDate || selectedEstate) {
      getAssignmentByMabes({
        tanggalTugas: selectedDate,
        wilayahTugas: selectedEstate,
        jenisTugas: selectedTask,
        sort,
      });
    }
  };

  const getTask = () => {
    axios
      .get(`${url}jenis-tugas/list`, {
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
      .get(`${url}wilayah-tugas/list`, {
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

  React.useEffect(() => {
    if (listDataFetching) {
      return;
    }

    getEstate();
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(getList, [selectedDate, selectedEstate, selectedTask]);

  React.useEffect(() => {
    setIsEmpty(listData.length === 0);
    setIsNoFilter(false);
  }, [listData]);

  const onChangeDate = (e) => {
    setSelectedDate(e.target.value);
    localStorage.setItem(
      'mabes_state',
      JSON.stringify({
        ...mabes_state,
        date: e.target.value,
      })
    );
  };

  const onChangeEstate = (e) => {
    setSelectedEstate(e.target.value);
    localStorage.setItem(
      'mabes_state',
      JSON.stringify({
        ...mabes_state,
        estate: e.target.value,
      })
    );
  };

  const onChangeTask = (e) => {
    setSelectedTask(e.target.value);
    localStorage.setItem(
      'mabes_state',
      JSON.stringify({
        ...mabes_state,
        task: e.target.value,
      })
    );
  };

  const onListClick = (id) => {
    navigate(`/assignment/detail/${id}`);
  };

  const onChangeSort = (e) => {
    const sort = e.target.value;
    getList(sort);
    localStorage.setItem(
      'mabes_state',
      JSON.stringify({
        ...mabes_state,
        sort: e.target.value,
      })
    );
  };

  return (
    <>
      <div className="header">
        <Header title="Penugasan" isWithBack to="/homepage" />
      </div>
      <div className="container">
        <p className="text-xs">Penugasan</p>
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold">Wilayah & Kerja</p>
          <Button
            isIcon
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            }
            onClick={() => navigate('/assignment/add')}
          />
        </div>
        <div>
          <div className="flex justify-between items-center gap-2">
            <Dropdown
              title="Estate"
              defaultValue="Pilih estate"
              option={estateList}
              onChange={onChangeEstate}
              disabled={listDataFetching}
            />
            <Dropdown
              title="Jenis Tugas"
              defaultValue="Pilih jenis tugas"
              option={taskList}
              onChange={onChangeTask}
              disabled={listDataFetching}
            />
          </div>
          <div className="flex justify-between items-center gap-2 mt-2">
            <div className="flex-auto w-64">
              <DatePicker
                defaultValue={moment().format('YYYY-MM-DD')}
                onChange={onChangeDate}
                disabled={listDataFetching}
              />
            </div>
            {/* <div className='flex-auto'>
                            <Button filterCount={filterCount} onClick={onClickFilter} isFilter={true} text='Filter'/>
                        </div> */}
            <DropDown defaultValue="Urutkan" option={sortOption} onChange={onChangeSort} disabled={listDataFetching} />
          </div>
        </div>
        {listDataFetching ? (
          <div className="flex my-4 justify-center">Sedang meminta data...</div>
        ) : !isNoFilter && !isEmpty ? (
          listData.map((result) => (
            <div className="my-4">
              <Table
                onClick={() => onListClick(result.id)}
                isWithFooter
                divisi_item={result.divisi.kode}
                hancak_item={result.hancak.kode}
                block_item={result.field.nama}
                clone_item={result.clone.nama}
                sistem_item={result.sistem.nama}
                mandor_item={result.mandor.nama}
                status_tugas_item={result.status_tugas === 'menunggu-persetujuan' ? 'menunggu' : result.status_tugas}
                tapper_item={result.hancak.jumlah_rekomendasi_tapper}
                tanggal_tugas_item={moment(result.tanggal_status, 'YYYY-MM-DD hh:mm:ss').format('HH:mm')}
                worker_total={result.pekerja.length}
              />
            </div>
          ))
        ) : isNoFilter && !isEmpty ? (
          <div className="flex my-4 justify-center">
            <span>Please select filter first</span>
          </div>
        ) : (
          <div className="flex my-4 justify-center">
            <span>No Data</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Mabes;
