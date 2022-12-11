import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useSendQuoteEmail() {
  const https = useHttps({
    method: "post",
    path: "Quote/quoteonemail",
  });

  return https;
}
