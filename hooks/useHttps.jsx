import React, { useMemo } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constants/api";

const HTTP_REQUESTS_KEY = "HTTPS_REQUESTS";

export default function useHttps({ method, path: _path, body }) {
  const path = useMemo(() => BASE_API_URL + _path, [_path]);

  const generateApiKeyFromBody = (body) =>
    `${method} ${path} ${JSON.stringify(body) || ""}`;

  const saveData = (data, body) => {
    const allRequests = JSON.parse(localStorage.getItem(HTTP_REQUESTS_KEY));
    const newRequestData = { [generateApiKeyFromBody(body)]: data };

    allRequests
      ? localStorage.setItem(
          HTTP_REQUESTS_KEY,
          JSON.stringify({ ...allRequests, ...newRequestData })
        )
      : localStorage.setItem(
          HTTP_REQUESTS_KEY,
          JSON.stringify({ ...newRequestData })
        );
  };

  const makeApiCall = async (thisBody) => {
    return axios[method](path, thisBody).then((data) => {
      saveData(data, thisBody);
      return data;
    });
  };

  // const checkIfRequestAlreadyExists = async (thisBody = body) => {
  //   let allRequests = JSON.parse(localStorage.getItem(HTTP_REQUESTS_KEY));

  //   if (!allRequests) return makeApiCall(thisBody);
  //   else if (allRequests) {
  //     if (allRequests[generateApiKeyFromBody(thisBody)])
  //       return allRequests[generateApiKeyFromBody(thisBody)];
  //     else return makeApiCall(thisBody);
  //   }
  // };

  return {
    fetch: makeApiCall,
    // fetch: method === "get" ? checkIfRequestAlreadyExists : makeApiCall,
    // refetch: makeApiCall,
  };
}
