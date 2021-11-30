import React, { useReducer, createContext, useEffect } from "react";
import { connectKeplr } from "../utils/keplr";
import { chain } from "./chain";

const initialState = {
  chosenHex: false,
  message: null,
  signer: null,
  address: null,
  signingClient: null,
  balance: 0,
  junoBalance: 0,
  outdatedHexData: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_HEX":
      return {
        ...state,
        chosenHex: action.payload,
      };
    case "SET_HEX_OUTDATED":
      return {
        ...state,
        outdatedHexData: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: {
          severity: action.payload.severity,
          text: action.payload.message,
        },
      };
    case "SET_WALLET":
      return {
        ...state,
        signer: action.payload.signer,
        address: action.payload.address,
      };
    case "SET_COSMJS":
      return {
        ...state,
        signingClient: action.payload.cosmJS,
      };
    case "SET_BALANCE":
      return {
        ...state,
        balance: action.payload.balance,
      };
    case "SET_BALANCE_JUNO":
      return {
        ...state,
        junoBalance: action.payload.balance,
      };
    default:
      return state;
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.wallet) {
      setTimeout(() => connectKeplr(chain, dispatch), 500);
    }

    // Reload wallet every time user change account
    window.addEventListener("keplr_keystorechange", () => {
      console.log(
        "Key store in Keplr is changed. You may need to refetch the account info."
      );
      connectKeplr(chain, dispatch);
    });

    return () => {
      window.removeEventListener("keplr_keystorechange", () => {});
    };
  }, []);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalContext = createContext();
export default Store;
