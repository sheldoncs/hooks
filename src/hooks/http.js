import { useReducer, useCallback } from "react";

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, data: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false, data: action.responseData };
    case "ERROR":
      return { loading: false, error: action.errorMessage, data: null };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not get here");
  }
};
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method: method,
      body: body,
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        dispatchHttp({ type: "RESPONSE", responseData: responseData });
      })
      .catch((error) => {
        dispatchHttp({
          type: "ERROR",
          errorMessage: error.Message,
        });
      });
  }, []);
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
