import { TOAST } from '../actions/types';

const toastState = {
  show: false,
  message: '',
  isError: false,
};

export const toast = (prevState = toastState, action) => {
  switch (action.type) {
    case TOAST.SHOW:
      return {
        ...action.payload,
        show: true,
      };
    case TOAST.HIDE:
      return toastState;
    default:
      return prevState;
  }
};
