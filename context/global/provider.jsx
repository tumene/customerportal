import React, { createContext, useContext, useReducer } from "react";
import { authReducer, AUTH_START, REGISTER_SUCCESS } from "./modules/reducer1";
import { globalContextReducer, initialState } from "./reducer";

const globalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [storeState, dispatchStoreAction] = useReducer(
    globalContextReducer,
    initialState
  );
  const [state, dispatch] = useReducer(authReducer, {
    data: null,
    error: null,
    isLoading: false,
  });

  const addData = (value) => {
    dispatch({ payload: value, type: REGISTER_SUCCESS });
  };

  return (
    <globalContext.Provider
      value={{
        state: storeState,
        state1: state,
        dispatch: dispatchStoreAction,
        addData,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(globalContext);
};
