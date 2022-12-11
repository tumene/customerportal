import { Button, PageHeader, Space, Steps } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useModal from "../../../../hooks/useModal";
import ContactDetailsForm from "./ContactDetailsForm";
import EducationCoverPersonalDetails from "./EducationCoverPersonalDetails";
import EducationCoverQuote from "./EducationCoverQuote";
import SelectedPackage from "./SelectedPackage";

const MAP_EDUCATION_POLICY_PRODUCT_TO_LABEL = {
  "sum-assured": "Target fund value",
  premium: "Target Investment Premium amount",
};

export default function GetEducationCoverForms({
  setActiveCoverScreenId,
  personalDetailsForm,
  generateQuote,
  generatingQuote,
}) {
  const router = useRouter();
  const { id: policyProductId } = router.query;
  const pageTitle = MAP_EDUCATION_POLICY_PRODUCT_TO_LABEL[policyProductId];
  const [ConfirmationModal, openConfirmationModal] = useModal();
  const [PackageModal, openPackageModal, closePackageModal] = useModal();
  const [nextAction, setNextAction] = useState("generate-quote");
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const backBtn = (
    <Button size="large" style={{ margin: "0 8px" }} onClick={() => prev()}>
      Go Back
    </Button>
  );

  const STEPS = [
    {
      title: "Product Details",
      Form: EducationCoverPersonalDetails,
    },
    {
      title: "Personal Details",
      Form: ContactDetailsForm,
    },
  ];

  const onSubmitPersonalDetailsForm = () => {
    openPackageModal();
  };

  const goToContactDetailsForm = (nextAction) => {
    if (nextAction === "request-callback") {
      generateQuote(nextAction);
    } else if (nextAction === "generate-quote") {
      setNextAction(nextAction);
      closePackageModal();
      next();
    }
  };

  const handleContactDetailsSubmit = () => {
    if (nextAction === "request-callback") {
      generateQuote(nextAction);
    } else if (nextAction === "generate-quote") {
      openConfirmationModal();
    }
  };

  const currentStep = STEPS[current];

  return (
    <>
      <PageHeader
        title={pageTitle || "Get Education Cover"}
        onBack={() => router.push(`/insurance/`)}
      />
      <Space direction="vertical" size="large">
        <Steps current={current}>
          {STEPS.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <currentStep.Form
            {...{
              personalDetailsForm,
              backBtn,
              openPackageModal,
              onSubmitPersonalDetailsForm,
              handleContactDetailsSubmit,
              generatingQuote,
              nextAction,
            }}
          />
        </div>
      </Space>

      <PackageModal footer={false}>
        <SelectedPackage
          {...{
            setActiveCoverScreenId,
            generateQuote,
            generatingQuote,
            goToContactDetailsForm,
          }}
        />
      </PackageModal>

      <ConfirmationModal footer={false}>
        <EducationCoverQuote
          {...{
            onNext: (screen) => {
              generateQuote?.(screen);
            },
            generatingQuote,
            personalDetailsForm,
          }}
        />
      </ConfirmationModal>
    </>
  );
}
