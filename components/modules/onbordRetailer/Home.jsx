import React, { useEffect, useState } from "react";
import { Button, Col, PageHeader, Row, Space } from "antd";
import { useRouter } from "next/router";
import AmountInput from "../../ui/atoms/amountInput/AmountInput";
import { BaseInput } from "../../ui/atoms/baseInput";
import { BaseSelect } from "../../ui/atoms/baseSelect";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { REGEX_PATTERNS } from "../../../constants/errors";
import axios from "axios";
import { useGlobalContext } from "../../../context/global/provider";
import { toast } from "react-hot-toast";
import Registration from "./Registration";
import useModalFlow from "../../../hooks/useModalFlow";
import ConfirmRegistration from "./ConfirmRegistration";
import VerifySMS from "../../../components/modules/onbordRetailer/VerifySMS";
import PrivateLayout from "../../ui/organisms/layout/PrivateLayout";
import QuoteHome from "../quote/Home";
import PaymentMethod from "../quote/PaymentMethod";
import MobilePayment from "../quote/payment/MobilePayment";
import { BASE_API_URL } from "../../../constants/api";
import { getFromStorage, saveToLocalStorage } from "../../../utils/dataTypes";
import Beneficiary from "./Beneficiary";

export default function Home() {
  const router = useRouter();
  const [activeCoverScreenId, setActiveCoverScreenId] = useState("");
  const [trackingId, setTrackingId] = useState(null);
  const [country, setCountry] = useState("");
  const [countryTrue, setCountryFalse] = useState(false);
  const methods = useForm();
  const {
    state,
    state1: { data },
    dispatch,
    addData,
  } = useGlobalContext();
  const [confirmPageResponseObject, setConfirmPageResponseObject] = useState(
    {}
  );
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  // const [serverDOB, setServerDOB] = useState("");

  let serverDOB;
  if (data?.dateOfBirth) {
    serverDOB = data?.dateOfBirth.split("T")[0];
  }

  const registration = useForm({
    defaultValues: {
      krapin: "",
      address: "",
      nationality: "",
      monthlyIncome: "",
      sourceOfFund: "",
      // educationLevel: "",
      idNumber: "",
    },
  });
  const confirmRegistration = useForm({
    defaultValues: {
      firstName: data?.firstName || "-",
      lastName: data?.lastName || "-",
      dateOfBirth: serverDOB || "",
      // dateOfBirth: "",
      emailAddress: data?.email || "",
      mobileNumber: data?.mobileNumber ?? "+254",
    },
  });
  const beneficiaryRegistration = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      emailAddress: "",
      mobileNumber: "",
      countryCode: "254",
      beneficiaryType: "",
      benefit: "100",
    },
  });

  useEffect(() => {
    let trackingId = data?.trackingId;

    if (trackingId) {
      let userSessionStage = `userCurrentStage__${trackingId}`;
      let lastStepStage = getFromStorage(userSessionStage);

      setTrackingId(trackingId);
      if (lastStepStage === "Quote") {
        router.push(`/quote/payment/${trackingId}`);
      } else {
        setCurrentFlowPage(lastStepStage);
      }
      // setCurrentFlowPage(lastStepStage);
    }
  }, [data]);

  const handleOnSubmit = (e) => {
    setLoading(true);
    axios
      .post(`${BASE_API_URL}Onboarding/register`, {
        ...e,
        trackingId: trackingId,
        CountryOfResidence: country,
        monthlyIncome: parseInt(e.monthlyIncome),
      })
      .then(function (response) {
        let statusCode = response?.data?.statusCode;
        if (statusCode == "00") {
          setLoading(false);
          toast.success(response?.data?.statusMessage);
          setCurrentFlowPage("beneficiary");
        } else {
          setLoading(false);
          toast.error(
            response?.data?.statusMessage ||
              "An error occurred please try again later"
          );
        }
      })
      .catch(function (error) {
        let errorMessage = error?.response?.data?.statusMessage;
        toast.error(errorMessage);
        setLoading(false);
      });
    dispatch(e);
    // addData(e)
  };

  const handleConfirmRegistration = (e) => {
    setLoading(true);
    axios
      .post(`${BASE_API_URL}Onboarding/confirmregistration`, {
        ...e,
        trackingId: trackingId,
        mobileNumber: `${e.countryCode}${e.mobileNumber}`,
      })
      .then(function (response) {
        let statusCode = response?.data?.statusCode;
        setLoading(false);
        if (statusCode == "00") {
          let responseData = response?.data?.responseObject;
          toast.success(response?.data?.statusMessage);
          setConfirmPageResponseObject(responseData);
          setUserData(e);

          setCurrentFlowPage("verify_OTP");
        } else {
          toast.error("An error occurred please try again later");
        }

        // setCurrentFlowPage("confirm_registration")
        // router.push("/onboard-retailer/verify");
      })
      .catch(function (error) {
        setLoading(false);
      });
    dispatch(e);
    // addData(e)
    // router.push("/onboard-retailer/verify");
  };

  const handleRegisterBeneficiary = (e) => {
    setLoading(true);
    const {
      benefit,
      dateOfBirth,
      emailAddress,
      firstName,
      lastName,
      id,
      relationship,
      phoneNumber,
      countryCode,
      beneficiaryType,
    } = e;
    // const { countryCode, phoneNumber } = e;
    let mobile = `${countryCode}${phoneNumber}`;
    mobile = mobile.replace("+", "");
    let payload = {
      beneficiaryType: beneficiaryType,
      firstName: firstName,
      relationship: relationship,
      idNumber: id,
      lastName: lastName,
      emailAddress: emailAddress,
      mobileNumber: mobile,
      dateOfBirth: dateOfBirth,
      benefit: benefit,
      TrackingId: trackingId,
      countryCode,
    };
    axios
      .post(`${BASE_API_URL}Onboarding/beneficiary`, payload)
      .then(function (response) {
        let statusCode = response?.data?.statusCode;
        let serverMessage = response?.data?.statusMessage;
        setLoading(false);
        if (statusCode == "00") {
          toast.success(serverMessage);
          setCurrentFlowPage("confirm_registration");
        } else {
          toast.error(
            serverMessage || "An error occurred please try again later..."
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
        toast.error("An error occurred please try again later");
      });
    // dispatch(e);
    // addData(e)
  };

  const screens = [
    {
      id: "registration",
      Component: ({ ...props }) => {
        return (
          <PrivateLayout>
            <Registration
              {...{
                ...props,
                registration,
                handleOnSubmit,
                setCurrentFlowPage,
                loading,
                setCountry,
                country,
                setCountryFalse,
                countryTrue,
              }}
              onNext={() => handleOnSubmit}
            />
          </PrivateLayout>
        );
      },
    },
    {
      id: "beneficiary",
      Component: () => (
        <PrivateLayout>
          <Beneficiary
            confirmRegistration={beneficiaryRegistration}
            showBuyNowButton={true}
            // handleOnSubmit={handleConfirmRegistration}
            handleOnSubmit={handleRegisterBeneficiary}
            onBack={() => setCurrentFlowPage("registration")}
            // onNext={() => setCurrentFlowPage("confirm_registration")}
            // onNext={handleRegisterBeneficiary}
            loading={loading}
            countryTrue={countryTrue}
            setCountryFalse={setCountryFalse}
          />
        </PrivateLayout>
      ),
    },
    {
      id: "confirm_registration",
      Component: () => (
        <PrivateLayout>
          <ConfirmRegistration
            confirmRegistration={confirmRegistration}
            showBuyNowButton={true}
            handleOnSubmit={handleConfirmRegistration}
            onBack={() => setCurrentFlowPage("beneficiary")}
            loading={loading}
          />
        </PrivateLayout>
      ),
    },
    {
      id: "verify_OTP",
      Component: () => (
        <VerifySMS
          // confirmRegistration={confirmRegistration}
          // showBuyNowButton={true}
          // handleOnSubmit={handleConfirmRegistration}
          onBack={() => setCurrentFlowPage("confirm_registration")}
          onNext={() => {
            setCurrentFlowPage("Quote");
            router.push(`/quote/payment/${trackingId}`);
          }}
          // onNext={() => setCurrentFlowPage("Quote")}
          OtpReferenceData={confirmPageResponseObject}
          userData={userData}
        />
      ),
    },
    // {
    //   id: "Quote",
    //   Component: () => (
    //     <PrivateLayout>
    //       <QuoteHome
    //         // confirmRegistration={confirmRegistration}
    //         // showBuyNowButton={true}
    //         // handleOnSubmit={handleConfirmRegistration}
    //         onNext={() => setCurrentFlowPage("payment_Method")}
    //         QuoteHome
    //         onBack={() => setCurrentFlowPage("verify_OTP")}
    //         OtpReferenceData={confirmPageResponseObject}
    //         userData={userData}
    //       />
    //     </PrivateLayout>
    //   ),
    // },
    // {
    //   id: "payment_Method",
    //   Component: ({ ...props }) => {
    //     return (
    //       <PrivateLayout>
    //         <PaymentMethod
    //           {...{
    //             ...props,
    //             registration,
    //             handleOnSubmit,
    //             setCurrentFlowPage,
    //             loading,
    //           }}
    //           onBack={() => setCurrentFlowPage("Quote")}
    //           onNext={() => setCurrentFlowPage("mobile_payment")}
    //         />
    //       </PrivateLayout>
    //     );
    //   },
    // },
    // {
    //   id: "mobile_payment",
    //   Component: () => (
    //     <PrivateLayout>
    //       <MobilePayment
    //         // confirmRegistration={confirmRegistration}
    //         // showBuyNowButton={true}
    //         // handleOnSubmit={handleConfirmRegistration}
    //         onNext={() => setCurrentFlowPage("payment_Method")}
    //         onBack={() => setCurrentFlowPage("payment_Method")}
    //         OtpReferenceData={confirmPageResponseObject}
    //         userData={userData}
    //       />
    //     </PrivateLayout>
    //   ),
    // },
  ];

  const [SelectedPackageFlow] = useModalFlow({
    screens,
    activeScreenId: activeCoverScreenId,
  });
  const setCurrentFlowPage = (currentFlow) => {
    let userSessionStage = `userCurrentStage__${trackingId}`;

    setActiveCoverScreenId(currentFlow);
    currentFlow =
      currentFlow == "verify_OTP" ? "confirm_registration" : currentFlow;
    saveToLocalStorage(userSessionStage, currentFlow);
  };
  return (
    <FormProvider {...methods}>
      <SelectedPackageFlow />
    </FormProvider>
  );
}
