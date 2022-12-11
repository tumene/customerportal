import React, { useState } from "react";
import useModalFlow from "../../../../../hooks/useModalFlow";

import Success from "../Success";
import PaymentDetails from "./PaymentDetails";
import PayToAccount from "./PayToAccount";
import { useForm } from "react-hook-form";


export default function MotorInsurancePage() {
  const [showBuyNowButton, setBuyNowButtonVisibility] = useState(true);
  const [activeScreenId, setActiveScreenId] = useState(""); // details-form | benefits | get-quote

  const payToAccountForm = useForm({
    defaultValues: {
      to: "",
      ref: "",
      currency: "",
      amount: "",
      currency: "",
    },
  });

  const [MotorInsuranceFlow] = useModalFlow({
    activeScreenId,
    screens: [
      {
        id: "details-form",
        Component: (
          <PayToAccount payToAccountForm={payToAccountForm} onNext={() => setActiveScreenId("benefits")} />
        ),
      },
      {
        id: "benefits",
        Component: (
          <PaymentDetails
            onNext={(nowOrLater) => {
              setBuyNowButtonVisibility(nowOrLater === "buy-now");
              setActiveScreenId("get-quote");
            }}
            onBack={() => setActiveScreenId("details-form")}
            payToAccountForm={payToAccountForm}
          />
        ),
      },
      {
        id: "get-quote",
        Component: (
          <Success
            {...{ showBuyNowButton }}
            onBack={() => setActiveScreenId("benefits")}
          />
        ),
      },
    ],
  });
  return (
    <>
      <MotorInsuranceFlow />
    </>
  );
}
