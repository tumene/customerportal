import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useGetEducationBenefits() {
  const https = useHttps({
    method: "get",
    path: "Parameter/premiumbenefits",
  });

  return https;
}
