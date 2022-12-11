import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import useModalFlow from "../../../../hooks/useModalFlow";
import useGetLastExpenseQuote from "../../../api/useGetLastExpenseQuote";
import PreviewQuote from "../PreviewQuote";
import RequestCallback from "../requestCallback/RequestCallback";
import GetLastExpenseCoverForms from "./GetLastExpenseCoverForms";

export default function GetLastExpenseCover() {
  const router = useRouter();
  const [activeCoverScreenId, setActiveCoverScreenId] = useState("");
  const lastExpensePersonalForm = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email_address: "",
      mobile_number: "",
      country_code: "+254",
      agrees_to_terms: false,
    },
  });
  const [trackingId, setTrackingId] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  const lastExpenseValues = {
    personalDetails: lastExpensePersonalForm.getValues(),
    selectedPackage,
  };
  const [generatingQuote, setGeneratingQuote] = useState(false);
  const generateQuoteApi = useGetLastExpenseQuote();

  const triggerGenerateQuote = async ({ requestCallBack } = {}) => {
    setGeneratingQuote(true);
    try {
      const response = await generateQuoteApi.fetch({
        personalInformation: {
          firstName: lastExpenseValues?.personalDetails?.first_name,
          lastName: lastExpenseValues?.personalDetails?.last_name,
          emailAddress: lastExpenseValues?.personalDetails?.email_address,
          mobileNumber: `${lastExpenseValues?.personalDetails?.country_code}${lastExpenseValues?.personalDetails?.mobile_number}`,
        },
        acceptTerms: lastExpenseValues?.personalDetails?.agrees_to_terms,
        premiumPackageId: lastExpenseValues?.selectedPackage?.id,
        requestCallBack: requestCallBack ? 1 : 0,
        id: uuid(),
      });

      const _trackingId = response?.data?.responseObject?.trackingId;
      setTrackingId(_trackingId);
      setGeneratingQuote(false);

      return response;
    } catch (error) {
      console.error(error);
      setGeneratingQuote(false);
      return error;
    }
  };

  const generateQuote = async (screen) => {
    const requestCallBack = screen === "request-callback";

    if (!requestCallBack) {
      await triggerGenerateQuote({ requestCallBack: false });
      setActiveCoverScreenId(screen);
    } else {
      setActiveCoverScreenId(screen);
    }
  };

  const screens = [
    {
      id: "default-screen",
      Component: GetLastExpenseCoverForms,
    },
    {
      id: "request-callback",
      Component: RequestCallback,
    },
    {
      id: "quote-pdf-screen--buy-now",
      Component: ({ ...props }) => <PreviewQuote showBuyNowButton {...props} />,
    },
    {
      id: "quote-pdf-screen--buy-later",
      Component: ({ ...props }) => <PreviewQuote {...props} />,
    },
  ];

  const [SelectedPackageFlow] = useModalFlow({
    screens,
    activeScreenId: activeCoverScreenId,
  });

  const goToDefaultScreen = () => setActiveCoverScreenId("default-screen");

  return (
    <SelectedPackageFlow
      {...{
        setActiveCoverScreenId,
        lastExpensePersonalForm,
        selectedPackage,
        setSelectedPackage,
        generateQuote,
        lastExpenseValues,
        generatingQuote,
        trackingId,
        emailAddress: lastExpenseValues?.personalDetails?.email_address,
        requestCallBackForm: lastExpensePersonalForm,
        triggerGenerateQuote,
        onCancelRequestCallback: goToDefaultScreen,
        onPreviewQuoteBack: goToDefaultScreen,
      }}
    />
  );
}
