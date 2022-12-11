import React, { useState } from "react";
import useModalFlow from "../../../../hooks/useModalFlow";
import EducationIntro from "./EducationIntro";
import SelectEducationProduct from "./SelectEducationProduct";

export default function GetEducationCoverModal() {
  const [activeEducationModalScreenId, setActiveEducationModalScreenId] =
    useState("intro");

  const educationModalScreens = [
    {
      id: "intro",
      Component: () => (
        <EducationIntro
          onApply={() => setActiveEducationModalScreenId("select-product")}
        />
      ),
    },
    {
      id: "select-product",
      Component: SelectEducationProduct,
    },
  ];

  const [EducationModalFlow] = useModalFlow({
    screens: educationModalScreens,
    activeScreenId: activeEducationModalScreenId,
  });

  return <EducationModalFlow />;
}
