import { useRouter } from "next/router";
import React, { useState } from "react";
import useModalFlow from "../../../../hooks/useModalFlow";
import LastExpenseQuote from "./LastExpenseQuote";
import SelectedPackageNextAction from "./SelectedPackageNextAction";

export default function SelectedPackage({
  setActiveCoverScreenId,
  lastExpenseValues,
  generateQuote,
  generatingQuote,
}) {
  const [nextAction, setNextAction] = useState();
  const [activeScreenId, setActiveScreenId] = useState("");

  const handleNextActionChange = (e) => {
    setNextAction(e.target.value);
  };

  const nextActions = [
    {
      key: "generate-quote",
      label: "Generate Quote",
      action: () => setActiveScreenId("quote-screen"),
    },
    {
      key: "request-callback",
      label: "Request a call back",
      action: () => {
        generateQuote("request-callback")
      },
    },
  ];

  const screens = [
    {
      id: "default-screen",
      Component: SelectedPackageNextAction,
    },
    {
      id: "quote-screen",
      Component: LastExpenseQuote,
    },
  ];

  const [ActiveScreen] = useModalFlow({
    screens,
    activeScreenId,
  });

  return (
    <ActiveScreen
      {...{
        nextActions,
        nextAction,
        lastExpenseValues,
        handleNextActionChange,
        setActiveCoverScreenId,
        generateQuote,
        generatingQuote,
      }}
    />
  );
}
