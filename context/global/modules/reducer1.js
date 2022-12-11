/* eslint-disable sort-keys */
export const AUTH_START = "AUTH_START";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
        orderLoading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        isLoading: false,
        isLoggedIn: true,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        data: null,
        error: action.payload,
        isLoading: false,
        isLoggedIn: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        isLoading: false,
        isLoggedIn: true,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        data: null,
        error: action.payload,
        isLoading: false,
        isLoggedIn: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
