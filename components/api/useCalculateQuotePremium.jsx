import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useCalculateQuotePremium() {
  const https = useHttps({
    method: "post",
    path: "Quote/quote/calculator",
  });

  return https;
}
