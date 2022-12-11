import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useModalFlow from "../../../../../hooks/useModalFlow";
import Failed from "../Failed";

import Success from "../Success";
import PayToAccountCard from "./PayToAccountCard";

export default function CardPayment() {
  const [showBuyNowButton, setBuyNowButtonVisibility] = useState(true);
  const [activeScreenId, setActiveScreenId] = useState(""); // details-form | benefits | get-quote


  const payMobileForm = useForm({
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
          <PayToAccountCard payMobileForm={payMobileForm} onNext={() => setActiveScreenId("success")} />
        ),
      },

      {
        id: "success",
        Component: (
          <Success
            {...{ showBuyNowButton }}
            onBack={() => setActiveScreenId("benefits")}
            data={{
              amount: "32,921.00 KES",
              charges: "0.00 KES",
              paymentType: "Pay with a card",
              paymentDetails: "Credit Card •••• 2000 American Express",
            }}
          />
        ),
      },
      {
        id: "failed",
        Component: (
          <Failed
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
