export const authInitialState = {
  auth: null,
};

export const authReducer = {
  "AUTH/SET_TOKEN": (state) => ({
    auth: { ...state.auth, authToken: "auth-token" },
  }),
};
