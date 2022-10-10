import store from '../';
import axios from 'axios';
import { ASSIGNMENT } from './types';

const { dispatch } = store;

export const getAssignmentByMandor = async ({ tanggalTugas }) => {
  dispatch({
    type: ASSIGNMENT.LIST_BY_MANDOR_ON_REQ,
  });

  try {
    const res = await axios.get(
      `/penugasan/by-mandor?filter[tanggal_tugas]=${tanggalTugas}&include=divisi,hancak,clone,sistem,mandor,field,wilayah_tugas`
    );

    dispatch({
      type: ASSIGNMENT.LIST_BY_MANDOR_ON_FINISH,
      payload: res.data.data.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGNMENT.LIST_BY_MANDOR_ON_FINISH,
      payload: [],
    });
    throw err;
  }
};

export const getAssignmentByMabes = async ({ tanggalTugas, wilayahTugas, jenisTugas, sort }) => {
  dispatch({
    type: ASSIGNMENT.LIST_BY_MABES_ON_REQ,
  });

  try {
    const res = await axios.get(
      `/penugasan/by-mabes?filter[tanggal_tugas]=${tanggalTugas}&filter[wilayah_tugas]=${wilayahTugas}&filter[jenis_tugas]=${jenisTugas}&sort=${
        sort === 'asc' || !sort ? '-' : ''
      }tanggal_tugas&include=divisi,hancak,field,clone,sistem,mandor,pekerja`
    );

    dispatch({
      type: ASSIGNMENT.LIST_BY_MABES_ON_FINISH,
      payload: res.data.data.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGNMENT.LIST_BY_MABES_ON_FINISH,
      payload: [],
    });
    throw err;
  }
};
