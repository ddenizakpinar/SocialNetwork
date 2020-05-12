import { SET_CURRENT_USER, LOG_OUT, SET_ERROR } from '../actions/actionTypes'

const initialState = {
  isAuthenticated: true,
  user: {},
  error: "",
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}