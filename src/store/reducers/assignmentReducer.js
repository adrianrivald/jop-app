import { ASSIGNMENT } from '../actions/types';

export default function () {
  return function (
    prev = {
      fetching: false,
      data: [],
    },
    action
  ) {
    const { type, payload } = action;
    switch (type) {
      case ASSIGNMENT.LIST_BY_MABES_ON_REQ:
        return {
          fetching: true,
          data: [],
        };
      case ASSIGNMENT.LIST_BY_MANDOR_ON_REQ:
        return {
          fetching: true,
          data: [],
        };
      case ASSIGNMENT.LIST_BY_MANDOR_ON_FINISH:
        return {
          fetching: false,
          data: payload,
        };
      case ASSIGNMENT.LIST_BY_MABES_ON_FINISH:
        return {
          fetching: false,
          data: payload,
        };
      default:
        return prev;
    }
  };
}
