import React from "react";
import useHttps from "../../hooks/useHttps";

export default function useSubmitItem() {
  const https = useHttps({
    method: "post",
    path: "https://reqbin.com/echo/post/json",
  });

  return https;
}
