import React, { useState } from "react";
import useModal from "../../../../hooks/useModal";
import { Space, Button, Steps, PageHeader } from "antd";
import SelectedPackage from "./SelectedPackage";
import LastExpensePersonalDetails from "./LastExpensePersonalDetails";
import LastExpenseSelectPackage from "./LastExpenseSelectPackage";
import { useRouter } from "next/router";

export default function GetLastExpenseCoverForms({
  setActiveCoverScreenId,
  lastExpensePersonalForm,
  selectedPackage,
  setSelectedPackage,
  generateQuote,
  lastExpenseValues,
  generatingQuote,
}) {
  const [PackageModal, openPackageModal] = useModal();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => setCurrent(current - 1);

  const backBtn = (
    <Button size="large" style={{ margin: "0 8px" }} onClick={() => prev()}>
      Go Back
    </Button>
  );

  const STEPS = [
    {
      title: "Personal Details",
      Form: LastExpensePersonalDetails,
    },
    {
      title: "Select package",
      Form: LastExpenseSelectPackage,
    },
  ];

  const currentStep = STEPS[current];

  return (
    <>
      <PageHeader
        title="Get Funeral Expense cover"
        onBack={() => router.push("/insurance")}
      />
      <Space direction="vertical" size="large">
        <Steps current={current}>
          {STEPS.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className="steps-content">
          {currentStep?.Form ? (
            <currentStep.Form
              {...{
                openPackageModal,
                backBtn,
                setSelectedPackage,
                selectedPackage,
                next,
                backBtn,
                lastExpensePersonalForm,
              }}
            />
          ) : null}
        </div>
      </Space>

      <PackageModal title={`${selectedPackage?.name} package`} footer={false}>
        <SelectedPackage
          {...{
            setActiveCoverScreenId,
            lastExpenseValues,
            generateQuote,
            generatingQuote,
          }}
        />
      </PackageModal>
    </>
  );
}
