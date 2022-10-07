/* eslint-disable @typescript-eslint/default-param-last */

import { UPDATE_SESSION } from '../actions/types';

const initState = {
  authenticated: false,
  user: undefined,
};

const session = (prevState = initState, action) => {
  switch (action.type) {
    case UPDATE_SESSION:
      return action.payload;
    default:
      return prevState;
  }
};

export default session;
