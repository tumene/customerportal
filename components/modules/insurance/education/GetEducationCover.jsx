import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import {
  DATE_FORMAT,
  MAP_EDUCATION_POLICY_PRODUCT_TO_ID,
  PAYMENT_FREQUENCIES_BY_NAME,
} from "../../../../constants/insuranceResources";
import useModalFlow from "../../../../hooks/useModalFlow";
import useGetEducationQuote from "../../../api/useGetEducationQuote";
import PreviewQuote from "../PreviewQuote";
import RequestCallback from "../requestCallback/RequestCallback";
import GetEducationCoverForms from "./GetEducationCoverForms";

export default function GetEducationCover() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState();
  const { id: policyProductId } = router.query;
  const [activeCoverScreenId, setActiveCoverScreenId] = useState();
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [generatingQuote, setGeneratingQuote] = useState(false);
  const personalDetailsForm = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      date_of_birth: "",
      duration: "",
      start_date: "",
      amount: "",
      payment_frequency: "",
      agrees_to_terms: false,
      email_address: "",
      country_code: "+254",
      contribution_amount: "",
    },
  });

  const generateQuoteApi = useGetEducationQuote();

  const triggerGenerateQuote = async ({ requestCallBack } = {}) => {
    const coverDetails = {
      personalDetails: personalDetailsForm?.getValues(),
    };

    setGeneratingQuote(true);

    try {
      const response = await generateQuoteApi.fetch({
        personalInformation: {
          firstName: coverDetails?.personalDetails?.first_name,
          lastName: coverDetails?.personalDetails?.last_name,
          mobileNumber: `${coverDetails?.personalDetails?.country_code}${coverDetails?.personalDetails?.mobile_number}`,
          emailAddress: coverDetails?.personalDetails?.email_address,
          dateOfBirth: coverDetails?.personalDetails?.date_of_birth,
        },
        acceptTerms: coverDetails?.personalDetails?.agrees_to_terms,
        contributionAmount: coverDetails?.personalDetails?.contribution_amount,
        educationPolicyProduct:
          MAP_EDUCATION_POLICY_PRODUCT_TO_ID[policyProductId],
        premiumPackageId: coverDetails?.selectedPackage?.id,
        numberOfYears: coverDetails?.personalDetails?.duration,
        coverStartDate: coverDetails?.personalDetails?.start_date,
        amount: coverDetails?.personalDetails?.amount,
        paymentFrequency:
          PAYMENT_FREQUENCIES_BY_NAME[
            coverDetails?.personalDetails?.payment_frequency
          ]?.[0]?.id,
        requestCallBack: requestCallBack ? 1 : 0,
        id: uuid(),
      });

      const _trackingId = response?.data?.responseObject?.trackingId;
      setTrackingId(_trackingId);
      setGeneratingQuote(false);

      return response;
    } catch (error) {
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
      Component: GetEducationCoverForms,
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
    activeScreenId: activeCoverScreenId,
    screens,
  });

  const goToDefaultScreen = () => setActiveCoverScreenId("default-screen");

  return (
    <SelectedPackageFlow
      {...{
        personalDetailsForm,
        selectedBenefits,
        setSelectedBenefits,
        setActiveCoverScreenId,
        generateQuote,
        generatingQuote,
        trackingId,
        emailAddress: personalDetailsForm?.getValues()?.email_address,
        requestCallBackForm: personalDetailsForm,
        triggerGenerateQuote,
        onCancelRequestCallback: goToDefaultScreen,
        onPreviewQuoteBack: goToDefaultScreen,
      }}
    />
  );
}
