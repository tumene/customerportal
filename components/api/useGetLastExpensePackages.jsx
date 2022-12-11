import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useGetLastExpensePackages() {
  const https = useHttps({
    method: "get",
    path: "Parameter/premiumpackages/lastexpense",
  });

  return https;
}
