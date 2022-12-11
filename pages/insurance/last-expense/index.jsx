import React from "react";
import GetLastExpenseCover from "../../../components/modules/insurance/lastExpense/GetLastExpenseCover";
import PrivateLayout from "../../../components/ui/organisms/layout/PrivateLayout";

export default function get() {
  return (
    <PrivateLayout>
      <GetLastExpenseCover />
    </PrivateLayout>
  );
}
