import { TOAST } from './types';
import store from '../';

const { dispatch } = store;

export const showToast = ({ message, isError = false }) => {
  dispatch({
    type: TOAST.SHOW,
    payload: {
      message,
      isError,
    },
  });
};

export const hideToast = () => {
  dispatch({
    type: TOAST.HIDE,
  });
};
