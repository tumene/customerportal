import React, { useEffect } from "react";
import useHttps from "../../hooks/useHttps";

export default function useGetUser() {
  const https = useHttps({
    method: "get",
    path: "https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8",
  });

  return https;
}
