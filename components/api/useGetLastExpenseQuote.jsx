import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useGetLastExpenseQuote() {
  const https = useHttps({
    method: "post",
    path: "Quote/quote/lastexpense",
  });

  return https;
}
