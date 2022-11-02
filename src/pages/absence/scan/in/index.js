import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../../../components/ui/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import Overlay from '../components/overlay';
import Joi from 'joi';
import { showToast } from '../../../../store/actions/uiAction';
import moment from 'moment';
import { ACCEPTED_STATUS_CODE } from 'fetch-queue/lib/CONSTANTS';

const SCHEMA = Joi.object({
  pekerja_id: Joi.string().uuid().label('Pekerja ID').required(),
  penugasan_id: Joi.string().uuid().label('Penugasan ID').required(),
});

function AbsenceIn() {
  const { id_tugas } = useParams();
  const navigate = useNavigate();

  const onResult = async (result, error) => {
    if (result) {
      try {
        await SCHEMA.validateAsync({
          pekerja_id: result?.text,
          penugasan_id: id_tugas,
        });

        const config = {
          headers: {
            Accept: 'application/json',
          },
        };

        const res = await axios.post(
          `/absensi/store`,
          {
            pekerja_id: result?.text,
            penugasan_id: id_tugas,
            tipe_absen: 'masuk',
            timestamp: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
          },
          config
        );

        if (res.status === ACCEPTED_STATUS_CODE) {
          showToast({
            message: 'koneksi anda bermasalah, data sudah dalam antrian!',
          });
          return navigate(-1);
        }

        navigate(`/absence/tapper/${result?.text}`);
      } catch (err) {
        if (err.isAxiosError) {
          return showToast({
            message: err.response?.data?.error?.message,
            isError: true,
          });
        }

        showToast({
          message: err.message,
          isError: true,
        });
      }
    }
  };

  return (
    <>
      <div className="header" style={{ position: 'relative', zIndex: '99' }}>
        <Header title="Absensi" isWithBack />
      </div>
      <div className="qr-area" style={{ marginTop: '-10px' }}>
        <QrReader
          scanDelay={1000}
          onResult={onResult}
          videoContainerStyle={{
            padding: 0,
            height: '100%',
            width: '100%',
          }}
          videoStyle={{
            height: 'auto',
            position: 'relative',
            // filter: 'brightness(60%)'
          }}
          ViewFinder={Overlay}
          constraints={{ facingMode: 'environment' }}
        />
      </div>
    </>
  );
}

export default AbsenceIn;
