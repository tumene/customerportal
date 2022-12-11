import React from "react";
import QuoteHome from "../../components/modules/quote/Home";
import PrivateLayout from "../../components/ui/organisms/layout/PrivateLayout";

export default function index() {
  return (
    <PrivateLayout>
      <QuoteHome />
    </PrivateLayout>
  );
}
