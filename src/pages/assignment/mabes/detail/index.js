import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams, createSearchParams } from 'react-router-dom';
import Button from '../../../../components/button/Button';
import Subtitle from '../../../../components/title/Subtitle';
import Title from '../../../../components/title/Title';
import Header from '../../../../components/ui/Header';
import Table from '../../../../components/ui/Table';
import Cookies from 'universal-cookie';
import Toast from '../../../../components/ui/Toast';
import warning from '../../../../assets/icons/warning.svg';
// import FlatButton from '../../../../components/button/flat';

const url = process.env.REACT_APP_API_URL;

function WorkerList(props) {
  return (
    <div className="flex justify-between items-center mt-3 pt-3">
      <p className="w-8 text-xxs mx-4">{props.scheme}</p>
      <div className="w-40">
        <p className="font-bold text-sm truncate">{props.name}</p>
        <p className="text-xxs">{props.code}</p>
      </div>
      <p className="w-20 text-sm text-flora font-bold">{props.status}</p>
      <div onClick={props.onClick} className="cursor-pointer">
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
      <hr />
    </div>
  );
}

function MabesDetail() {
  const { id } = useParams();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();
  const [detailData, setDetailData] = React.useState({});
  const [workerList, setWorkerList] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  React.useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetail = async () => {
    await axios
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
        setWorkerList(data.pekerja);
      });
  };

  const onSubmitAssignment = () => {
    if (detailData?.pekerja?.length > 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      };
      axios
        .post(
          `${url}penugasan/izinkan-tapper`,
          {
            penugasan_id: detailData.id,
          },
          config
        )
        .then((res) => {
          setIsSubmitted(true);
          setAlertMessage('Sukses izinkan tugas');
          setTimeout(() => {
            setIsSubmitted(false);
            navigate('/assignment');
          }, 3000);
        });
    }
  };

  const onCancel = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
    axios
      .post(
        `${url}penugasan/batalkan-tugas`,
        {
          penugasan_id: detailData.id,
        },
        config
      )
      .then((res) => {
        setIsSubmitted(true);
        setAlertMessage('Sukses membatalkan tugas');
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      });
  };

  const onEdit = () => {
    if (detailData?.status_tugas === 'menunggu-persetujuan' || detailData?.status_tugas === 'dialihkan') {
      navigate(`/assignment/detail/${id}/edit`);
    }
  };

  const onClickWorkerList = (id_tapper) => {
    navigate(`/absence/tapper/${id_tapper}`);
  };

  const onSwitch = () => {
    navigate({
      pathname: `/assignment/detail/${id}/edit`,
      search: createSearchParams({
        isSwitch: 'true',
      }).toString(),
    });
  };

  return (
    <>
      <div className="header">
        <Header title="Penugasan" isWithBack to="/assignment" />
      </div>
      <div className="container">
        <div className="flex justify-between items-center">
          <Title text={detailData?.wilayah_tugas?.nama} />
          <Button
            disabled={
              detailData?.status_tugas !== 'menunggu-persetujuan' && detailData?.status_tugas !== 'dialihkan'
                ? true
                : false
            }
            onClick={onEdit}
            isText={true}
            text={'Edit'}
          />
        </div>
        <div className="mt-6">
          <Subtitle text="Informasi Wilayah & Cuaca" />
          <span>-</span>
        </div>
        <Table
          divisi_item={detailData?.divisi?.kode}
          hancak_item={detailData?.hancak?.kode}
          block_item={detailData?.field?.nama}
          clone_item={detailData?.clone?.nama}
          sistem_item={detailData?.sistem?.nama}
          borderColor="border border-cloud"
          backgroundColor="bg-bgrey"
          cellBorder="border border-cloud"
          // tbListFooter={tbListFooter}
        />
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-xs">{detailData?.mandor?.level}</p>
            <p className="text-sm font-bold">{detailData?.mandor?.nama}</p>
          </div>
          <div>
            <p className="text-xs">{moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('D MMMM, YYYY')}</p>
            <p className="text-xs">
              {moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')} - selesai
            </p>
          </div>
        </div>
        {detailData?.status_tugas !== 'dialihkan' ? (
          <>
            <div className="divide-y divide-cloud">
              {workerList?.length > 0 ? (
                workerList.map((res, idx) => (
                  <WorkerList
                    name={res.nama}
                    code={res.kode}
                    status={res.status}
                    scheme={res.skema_kerja.nama}
                    onClick={() => onClickWorkerList(res.id)}
                  />
                ))
              ) : (
                <div className=" mt-3 pt-3 text-center">No data</div>
              )}
            </div>
            <div className="mt-11">
              {detailData?.status_tugas === 'diterima' && detailData?.approved_by_mabes_at ? null : (
                <Button
                  disabled={detailData?.pekerja?.length === 0}
                  isText={true}
                  text={'Izinkan'}
                  className="w-full rounded-xl text-sm"
                  onClick={onSubmitAssignment}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-3.5 -mx-5 mt-4 p-5 bg-sun">
              <img src={warning} alt="warning" />
              <p className="text-white">Permintaan Pengalihan Tugas</p>
            </div>
            <div className="mt-4">
              <div className="mb-3">
                <p>Alasan pengalihan</p>
                <p className="font-bold">{detailData?.alasan_pengalihan}</p>
              </div>
              <div className="notes">
                <p>Pesan tambahan</p>
                <p className="font-bold">{detailData?.pesan_tugas}</p>
              </div>
            </div>
            <div className="mt-11">
              <Button
                isText={true}
                text={'Izinkan dan lakukan pengalihan'}
                className="w-full rounded-xl text-sm"
                onClick={onSwitch}
              />
              <Button
                className="mt-2 w-full rounded-xl text-sm"
                role="white"
                isBack
                isText
                text="Batalkan Tugas"
                onClick={onCancel}
              />
            </div>
          </>
        )}
        <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
      </div>
    </>
  );
}

export default MabesDetail;
