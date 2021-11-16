import React, { useReducer, createContext } from "react";

const initialState = {
  chosenHex: [],
  message: null
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_HEX":
      return {
        ...state,
        chosenHex: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: {
          severity: action.payload.severity,
          text: action.payload.message,
        },
      };
    default:
      return state;
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalContext = createContext();
export default Store;
