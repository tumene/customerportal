import React, { useState } from "react";
import useModalFlow from "../../../../hooks/useModalFlow";
import LastExpenseIntro from "./LastExpenseIntro";
import LastExpenseRequiredDetails from "./LastExpenseRequiredDetails";

export default function GetLastExpenseCoverModal({ close }) {
  const [activeScreen, setActiveScreen] = useState("");
  const lifeExpenseModalScreens = [
    {
      id: "intro",
      Component: LastExpenseIntro,
    },
    {
      id: "required-details",
      Component: LastExpenseRequiredDetails,
    },
  ];

  const [LifeExpenseModalFlow] = useModalFlow({
    screens: lifeExpenseModalScreens,
    activeScreenId: activeScreen,
  });


  return <LifeExpenseModalFlow {...{ setActiveScreen , close}} />;
}
