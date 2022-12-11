import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useModalFlow from "../../../../../hooks/useModalFlow";
import Failed from "../Failed";

import Success from "../Success";
import PayToAccountCard from "./PayToAccountCard";

export default function MobilePayment({onBack}) {
  const [showBuyNowButton, setBuyNowButtonVisibility] = useState(true);
  const [activeScreenId, setActiveScreenId] = useState(""); // details-form | benefits | get-quote



  
  const [MotorInsuranceFlow] = useModalFlow({
    activeScreenId,
    screens: [
    
      {
        id: "details-form",
        Component: (
          <PayToAccountCard onNext={() => setActiveScreenId("success")} onBack={onBack} />
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
      {
        id: "success",
        Component: (
          <Success
            {...{ showBuyNowButton }}
            onBack={() => setActiveScreenId("benefits")}
            data={{
              amount: "32,921.00 KES",
              charges: "0.00 KES",
              paymentType: "Pay with a mobile",
              paymentDetails: "Credit Card •••• 2000 American Express",
              transactionReference:'QV301384279'
            }}
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
