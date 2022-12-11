import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useCancelQuote() {
  const https = useHttps({
    method: "post",
    path: "Quote/quote/decline",
  });

  return https;
}

export function usePreviewQuoteApi({ trackingId } = {}) {
  const https = useHttps({
    method: "get",
    path: `Quote/quote/template?TrackingId=${trackingId}`,
  });

  return https;
}
