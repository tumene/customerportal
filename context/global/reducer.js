import { authInitialState, authReducer } from "./modules/auth";
import {
  userProfileInitialState,
  userProfileReducer,
} from "./modules/userProfile";

const reducer = {
  ...authReducer,
  ...userProfileReducer,
};

export const initialState = {
  ...authInitialState,
  ...userProfileInitialState,
};

export function globalContextReducer(state, action) {
  return { ...state, ...reducer[action.type]?.(state, action) };
}
