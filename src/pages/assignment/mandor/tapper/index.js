import React, { useEffect, useState } from 'react';
import Header from '../../../../components/ui/Header';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FlatButton from '../../../../components/button/flat';
import { showToast } from '../../../../store/actions/uiAction';

const TapperPlanning = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [detail, setDetail] = useState({});
  const [listTapper, setListTapper] = useState([]); // untuk muncul list tapper
  const [listWorker, setListWorker] = useState([]); // untuk nyimpan checked tapper

  const getAllData = async () => {
    let detailData;

    await axios
      .get(
        `/penugasan/detail/${id}?sort=-tanggal_tugas&include=hancak,wilayah_tugas,jenis_tugas,divisi,hancak,field,clone,sistem,mandor,pekerja.skema_kerja`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
      .then((result) => {
        if (result.data.code === 200) {
          const data = result.data.data;
          setListWorker(data.pekerja.map((data) => data.id));
          setDetail(data);
          detailData = data;
        }
      });

    await axios
      .get(`/penugasan/list-tapper/available/${id}?include=wilayah_tugas,skema_kerja`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((result) => {
        if (result.data.code === 200) {
          const data = result.data.data.data;
          const newData = data.map((listTapper) => {
            let newListTapper = { ...listTapper, isChecked: false };
            // eslint-disable-next-line array-callback-return
            detailData?.pekerja.map((item) => {
              if (listTapper.id === item.id) {
                return (newListTapper = { ...listTapper, isChecked: true });
              }
            });
            return newListTapper;
          });
          setListTapper(newData);
        }
      });
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detailPekerja = () =>
    detail.pekerja?.map((tapper, key) => (
      <li key={key} className="w-full rounded-t-lg border-b border-gray-200 cursor-pointer">
        <div className="flex items-center pl-3">
          <label
            htmlFor={tapper.id}
            className="flex justify-between items-center py-3 ml-2 w-full text-sm font-medium text-left"
            onClick={() => goToDetailTapper(tapper.id)}
          >
            <div className="w-16">{tapper.skema_kerja?.nama}</div>
            <div className="flex flex-col flex-1 mx-4">
              <div className="font-bold">{tapper?.nama}</div>
              <div>{tapper?.kode}</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </label>
        </div>
      </li>
    ));

  const handleListTapper = (e) => {
    if (listWorker.indexOf(e.target.value) > -1) {
      const newListWorker = listWorker.filter((item) => item !== e.target.value);
      setListWorker(newListWorker);
    } else {
      setListWorker([...listWorker, e.target.value]);
    }
  };

  const handleAssignWorker = async () => {
    try {
      if (!listWorker.length) {
        throw new Error('Daftar tapper tidak bisa kosong!');
      }
      await axios.post(
        `/penugasan/assign-pekerja`,
        {
          penugasan_id: id,
          pekerja: listWorker,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      navigate(`/assignment`);
    } catch (error) {
      if (error.isAxiosError) {
        showToast({ message: error.response.data.message, isError: true });
      } else {
        showToast({ message: error.message, isError: true });
      }
    }
  };

  const goToDetailTapper = (id) => navigate(`/absence/tapper/${id}`);

  return (
    <div className="App min-h-screen h-full">
      <Header title="Perencanaan Tapper" isWithBack to={`/assignment/detail/${id}/accept`} />
      <section className="container p-4 flex flex-col justify-between">
        <div className="flex flex-col items-start justify-center">
          <h1 className="font-bold text-left mb-2">{detail.wilayah_tugas?.nama}</h1>
          <p className="mb-1">Informasi Wilayah & Cuaca</p>
          <p className="mb-4">-</p>
          <div className="grid grid-cols-5 rounded-lg w-full border border-cloud mb-3">
            <div className="flex flex-col text-left text-xs py-3 px-2 border-r border-cloud">
              <h1 className="mb-2">Divisi</h1>
              <div className="font-bold">{detail?.divisi?.kode}</div>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2 border-r border-cloud">
              <h1 className="mb-2">Hancak</h1>
              <div className="font-bold">{detail?.hancak?.kode}</div>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2 border-r border-cloud">
              <h1 className="mb-2">Block</h1>
              <div className="font-bold">{detail?.field?.nama}</div>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2 border-r border-cloud">
              <h1 className="mb-2">Clone</h1>
              <div className="font-bold">{detail?.clone?.nama}</div>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2">
              <h1 className="mb-2">Sistem</h1>
              <div className="font-bold">{detail?.sistem?.nama}</div>
            </div>
          </div>
          <p className="text-xs mb-1">Jenis Pekerjaan</p>
          <p className="font-bold mb-4">Tapper</p>
          <ul className="w-full text-sm font-medium">
            {detail.approved_by_mabes_at === null
              ? listTapper.map((tapper, key) => (
                  <li key={key} className="w-full rounded-t-lg border-b border-gray-200 cursor-pointer">
                    <div className="flex items-center pl-3">
                      <input
                        id={tapper.id}
                        type="checkbox"
                        value={tapper.id}
                        className="w-6 h-6 border-2 border-earth rounded-lg"
                        onChange={(e) => handleListTapper(e)}
                        defaultChecked={tapper.isChecked}
                      />
                      <label
                        htmlFor={tapper.id}
                        className="flex justify-between items-center py-3 ml-2 w-full text-sm font-medium text-left"
                        onClick={() => goToDetailTapper(tapper.id)}
                      >
                        <div className="w-16">{tapper.skema_kerja?.nama}</div>
                        <div className="flex flex-col flex-1 mx-4">
                          <div className="font-bold">{tapper?.nama}</div>
                          <div>{tapper?.kode}</div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </label>
                    </div>
                  </li>
                ))
              : detailPekerja()}
          </ul>
        </div>
        {detail.approved_by_mabes_at === null && (
          <FlatButton className={'w-full mb-2 text-sm font-bold mt-6'} text={'Simpan'} onClick={handleAssignWorker} />
        )}
      </section>
    </div>
  );
};

export default TapperPlanning;
