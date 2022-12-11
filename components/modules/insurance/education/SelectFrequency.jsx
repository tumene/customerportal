import {
  Button,
  Divider,
  Input,
  InputNumber,
  Radio,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uuid from "react-uuid";
import {
  MAP_EDUCATION_POLICY_PRODUCT_TO_ID,
  PAYMENT_FREQUENCIES,
  PAYMENT_FREQUENCIES_BY_NAME,
} from "../../../../constants/insuranceResources";
import useModalFlow from "../../../../hooks/useModalFlow";
import useCalculateQuotePremium from "../../../api/useCalculateQuotePremium";
import { BaseSelect } from "../../../ui/atoms/baseSelect";

export default function SelectFrequency({
  personalDetailsForm,
  formErrors,
  onContinue,
}) {
  // TODO: --- MOVE CALCULATOR CODE TO GET_EDUCATION_COVER COMPONENTS ----
  const [calculatingPremium, setCalculatingPremium] = useState(false);
  const calculateQuotePremiumApi = useCalculateQuotePremium();
  const details = personalDetailsForm?.getValues();
  const router = useRouter();
  const { id: policyProductId } = router.query;

  const [selectedFrequency, setSelectedFrequency] = useState(
    personalDetailsForm?.getValues("payment_frequency")
  );
  const handleSelectFrequency = ({ target: { value } }) => {
    setSelectedFrequency(value);
  };

  const [activeScreenId, setActiveScreenId] = useState();

  const { control, getValues, setValue } = useForm({
    defaultValues: {
      contribution_amount: personalDetailsForm?.getValues(
        "contribution_amount"
      ),
    },
  });

  useEffect(() => {
    return () => {
      personalDetailsForm.setValue(
        "contribution_amount",
        getValues("contribution_amount"),
        { shouldValidate: true }
      );
    };
  }, []);

  const calculateQuotePremium = async () => {
    setCalculatingPremium(true);

    try {
      const response = await calculateQuotePremiumApi.fetch({
        educationPolicyProduct:
          MAP_EDUCATION_POLICY_PRODUCT_TO_ID[policyProductId],
        amount: details.amount,
        numberOfYears: details?.duration,
        dateOfBirth: details?.date_of_birth,
        paymentFrequency:
          PAYMENT_FREQUENCIES_BY_NAME[details?.payment_frequency]?.[0]?.id,
        id: uuid(),
      });

      if (response?.data?.successful === false) {
        toast.error(response?.data?.statusMessage);
      } else {
        setActiveScreenId("enter-amount");
        setValue(
          "contribution_amount",
          response?.data?.responseObject?.totalPremium
        );
      }
    } catch (error) {
      const message = error?.response?.data?.title;
      toast.error(
        `${message} Ensure your Fund Value, Date of Birth and cover Duration have been provided.` || "Unable to generate premium amount, please try again later."
      );
    } finally {
      setCalculatingPremium(false);
    }
  };

  const screens = [
    {
      id: "select-frequency",
      Component: () => (
        <Space size={30} direction="vertical">
          <Typography.Title level={4}>Payment Frequency</Typography.Title>

          <Space direction="vertical" size="middle">
            {PAYMENT_FREQUENCIES?.map((frequency, i) => (
              <Fragment key={i}>
                <label style={{ cursor: "pointer" }}>
                  <Space style={{ justifyContent: "space-between" }}>
                    <div>
                      <Typography.Text>{frequency.name}</Typography.Text>
                    </div>
                    <div>
                      <Radio
                        value={frequency.name}
                        checked={selectedFrequency === frequency.name}
                        onChange={handleSelectFrequency}
                      />
                    </div>
                  </Space>
                </label>

                {i !== PAYMENT_FREQUENCIES.length - 1 && (
                  <Divider style={{ margin: "0" }} />
                )}
              </Fragment>
            ))}
          </Space>

          <Button
            type="primary"
            size="large"
            disabled={!selectedFrequency}
            onClick={() => calculateQuotePremium()}
            loading={calculatingPremium}
          >
            Continue
          </Button>
        </Space>
      ),
    },
    {
      id: "enter-amount",
      Component: () => {
        return (
          <Space direction="vertical" size={30}>
            <Typography.Title level={4}>
              {selectedFrequency} Investment & Risk Premium
            </Typography.Title>

            <Controller
              name="contribution_amount"
              control={control}
              render={({ field: { value, onChange } }) => {
                const errorMessage = formErrors?.start_date?.message;

                return (
                  <>
                    <label>
                      <div className="base-input__label">
                        Amount
                      </div>
                      <Input.Group compact>
                        <BaseSelect defaultValue="KES" disabled />
                        <InputNumber
                          disabled
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          {...{
                            value,
                            // onChange,
                          }}
                        />
                      </Input.Group>
                      {errorMessage ? (
                        <Typography.Text>{errorMessage}</Typography.Text>
                      ) : null}
                    </label>
                  </>
                );
              }}
            />

            <Button type="primary" size="large" onClick={onContinue}>
              Continue
            </Button>
          </Space>
        );
      },
    },
  ];

  const [SelectFrequencyFlow] = useModalFlow({
    screens,
    activeScreenId,
  });

  useEffect(() => {
    if (selectedFrequency)
      personalDetailsForm?.setValue("payment_frequency", selectedFrequency, {
        shouldValidate: true,
      });
  }, [selectedFrequency]);

  return <SelectFrequencyFlow />;
}
