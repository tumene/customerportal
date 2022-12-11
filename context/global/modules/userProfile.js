export const userProfileInitialState = {
  userProfile: null,
};

export const userProfileReducer = {
  "USER/SET_NAME": (state, action) => ({
    userProfile: { ...state.userProfile, name: action.data },
  }),
  "USER/SET_AGE": (state, action) => ({
    userProfile: { ...state.userProfile, age: action.data },
  }),
};
