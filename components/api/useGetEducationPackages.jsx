import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useGetEducationPackages() {
  const https = useHttps({
    method: "get",
    path: "Parameter/premiumpackages/education",
  });

  return https;
}
