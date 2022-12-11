import React, { useState } from "react";
import RequestCallbackSuccess from "./RequestCallbackSuccess";
import useModalFlow from "../../../../hooks/useModalFlow";
import RequestCallbackForm from "./RequestCallbackForm";

export default function RequestCallback({
  requestCallBackForm,
  triggerGenerateQuote,
  generatingQuote,
  onCancelRequestCallback,
}) {
  const [activeRequestCallbackScreenId, setActiveRequestCallbackScreenId] =
    useState("");

  const screens = [
    {
      id: "request-callback",
      Component: RequestCallbackForm,
    },
    {
      id: "request-success",
      Component: RequestCallbackSuccess,
    },
  ];

  const [RequestCallbackFlow] = useModalFlow({
    activeScreenId: activeRequestCallbackScreenId,
    screens,
  });

  const onSuccess = async () => {
    try {
      await triggerGenerateQuote({ requestCallBack: true });
      setActiveRequestCallbackScreenId("request-success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RequestCallbackFlow
      {...{
        setActiveRequestCallbackScreenId,
        onSuccess,
        requestCallBackForm,
        requestingCallback: generatingQuote,
        onBack: onCancelRequestCallback,
      }}
    />
  );
}
