import React from "react";
import InsurancePage from "../../components/modules/insurance/InsurancePage";
import PrivateLayout from "../../components/ui/organisms/layout/PrivateLayout";

export default function index() {
  return (
    <PrivateLayout>
      <InsurancePage />
    </PrivateLayout>
  );
}
