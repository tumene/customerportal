import { useRouter } from "next/router";
import React, { useEffect } from "react";
import VerifySMS from "../../components/modules/onbordRetailer/VerifySMS";
import PrivateLayout from "../../components/ui/organisms/layout/PrivateLayout";

export default function index() {
  return <VerifySMS />;
}
