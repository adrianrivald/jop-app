import { UPDATE_SESSION } from './types';
import store from '../';
import axios from 'axios';
import Cookies from 'universal-cookie';

const { dispatch } = store;

export const updateSession = async (s) => dispatch({ type: UPDATE_SESSION, payload: s });

export const login = async (username, password) => {
  try {
    const res = await axios.post(`login`, {
      username: username,
      password: password,
    });

    const {
      data: { data },
    } = res;

    const token = data.token;
    const user = data.user;
    const cookies = new Cookies();

    cookies.set('token', token, { path: '/' });
    localStorage.setItem(
      'userData',
      JSON.stringify({
        level: user.level,
        name: user.nama,
        code: user.code,
        id: user.id,
      })
    );

    dispatch({
      type: UPDATE_SESSION,
      payload: {
        authenticated: true,
        user,
      },
    });
  } catch (err) {
    if (err.isAxiosError) {
      if (err.response.status === 422) {
        throw new Error(err.response.data.message);
      } else if (error.response.status === 401) {
        throw new Error('login gagal');
      }
    }

    throw err;
  }
};

export const logout = async () => {
  const cookies = new Cookies();
  cookies.remove('token', { path: '/' });

  localStorage.clear();

  dispatch({
    type: UPDATE_SESSION,
    payload: {
      authenticated: false,
      user: undefined,
    },
  });
};
