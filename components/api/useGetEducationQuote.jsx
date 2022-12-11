import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useGetEducationQuote() {
  const https = useHttps({
    method: "post",
    path: "Quote/quote/education",
  });

  return https;
}
