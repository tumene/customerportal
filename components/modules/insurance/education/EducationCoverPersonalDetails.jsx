import React, { useState } from "react";
import {
  Col,
  Row,
  Checkbox,
  Button,
  Space,
  Typography,
  DatePicker,
  Input,
  InputNumber,
} from "antd";
import BaseSelect from "../../../ui/atoms/baseSelect/BaseSelect";
import { Controller } from "react-hook-form";
import { DATE_FORMAT } from "../../../../constants/insuranceResources";
import { useRouter } from "next/router";
import useModal from "../../../../hooks/useModal";
import SelectCoverDuration from "./SelectCoverDuration";
import moment from "moment";
import SelectFrequency from "./SelectFrequency";
import EdPolicy from "../EdPolicy";
import EqTerms from "../EqTerms";
import { disableFutureDate } from "../../../../utils/date";

export default function EducationCoverPersonalDetails({
  personalDetailsForm,
  onSubmitPersonalDetailsForm,
}) {
  const router = useRouter();
  const { id: policyProductId } = router.query;
  const next = onSubmitPersonalDetailsForm;
  const { control, handleSubmit, register } = personalDetailsForm;

  const watchFrequency = personalDetailsForm?.watch("payment_frequency");

  const onSubmit = () => {
    next?.();
  };

  const [TermsModal, openTermsModal, closeTermsModal] = useModal();
  const [PolicyModal, openPolicyModal, closePolicyModal] = useModal();
  const [CoverDurationModal, openCoverDurationModal, closeCoverDurationModal] =
    useModal();
  const [FrequencyModal, openFrequencyModal, closeFrequencyModal] =
    useModal(false);

  const contributionAmountField = register(
    "contribution_amount"
    // {
    //   required: "Generate Contribution amount",
    // }
  );

  const startField = register("start_date", {
    required: "Select Start Date",
  });

  const durationField = register("duration", {
    required: "Select Duration",
  });

  const formErrors = personalDetailsForm?.formState?.errors;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="large">
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <div>
                <h3>Please enter your fund value details</h3>
              </div>
            </Col>

            <Col span={24}>
              <Row gutter={[55, 55]}>
                <Col span={12}>
                  <Controller
                    name="amount"
                    control={control}
                    rules={{
                      required: "Enter a valid amount",
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.amount?.message;

                      const label =
                        policyProductId === "premium"
                          ? `${watchFrequency} investment premium`
                          : `Target fund value`;

                      return (
                        <>
                          <label>
                            <div className="base-input__label">{label}</div>
                            <Input.Group compact>
                              <BaseSelect defaultValue="KES" disabled />
                              <InputNumber
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                parser={(value) =>
                                  value.replace(/\$\s?|(,*)/g, "")
                                }
                                {...{
                                  value,
                                  onChange,
                                }}
                              />
                            </Input.Group>
                            {errorMessage ? (
                              <Typography.Text
                                type="danger"
                                style={{ display: "block" }}
                              >
                                {errorMessage}
                              </Typography.Text>
                            ) : null}
                          </label>
                          <Typography.Text type="secondary">
                            {policyProductId === "premium"
                              ? " Enter the amount you want to save for the investment period"
                              : "Enter your target fund value at the end of the investment period"}
                          </Typography.Text>
                        </>
                      );
                    }}
                  />
                </Col>

                <Col span={12}>
                  <Controller
                    name="date_of_birth"
                    control={control}
                    rules={{
                      required: "Enter your date of birth",
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.date_of_birth?.message;

                      const _onChange = (_, value) => {
                        personalDetailsForm.setValue("date_of_birth", value, {
                          shouldValidate: true,
                        });
                      };

                      return (
                        <Space direction="vertical" size={0}>
                          <span className="base-input__label">
                            Date of Birth
                          </span>

                          <DatePicker
                            onChange={_onChange}
                            format={DATE_FORMAT}
                            className="base-input__date"
                            value={value ? moment(value, DATE_FORMAT) : value}
                            disabledDate={(currentDate) =>
                              disableFutureDate(currentDate, {
                                amount: 18,
                                label: "years",
                              })
                            }
                            {...{ errors: [errorMessage] }}
                          />

                          <Typography.Text type="danger">
                            {errorMessage}
                          </Typography.Text>
                        </Space>
                      );
                    }}
                  />
                </Col>

                <Col span={12}>
                  <Controller
                    name="duration"
                    control={control}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessages = [
                        errors?.duration?.message,
                        errors?.start_date?.message,
                      ];

                      return (
                        <button
                          type="button"
                          className="base-select--pop-up"
                          onClick={openCoverDurationModal}
                        >
                          <BaseSelect
                            label="Cover Duration"
                            placeholder="Select cover duration"
                            className="base-select--pop-up"
                            disabled
                            errors={errorMessages}
                            {...{ value, onChange }}
                          />
                        </button>
                      );
                    }}
                  />
                </Col>

                <Col span={12}>
                  <Controller
                    name="payment_frequency"
                    control={control}
                    rules={{
                      required: "Select payment frequency",
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessages = [
                        errors?.payment_frequency?.message,
                        errors?.contribution_amount?.message,
                      ];

                      return (
                        <button
                          type="button"
                          className="base-select--pop-up"
                          onClick={openFrequencyModal}
                        >
                          <BaseSelect
                            disabled
                            label="Payment Frequency"
                            placeholder="Select the payment frequency"
                            name="frequency"
                            errors={errorMessages}
                            {...{ value, onChange }}
                          />
                        </button>
                      );
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <br />

          <Controller
            name="agrees_to_terms"
            control={control}
            rules={{ required: "Please agree to our terms to proceed" }}
            render={({ field: { value, onChange }, formState: { errors } }) => {
              const errorMessage = errors?.agrees_to_terms?.message;

              return (
                <Space direction="vertical" size={5}>
                  <Checkbox {...{ checked: value, onChange }}>
                    I accept the{" "}
                    <Button
                      style={{ padding: 0 }}
                      type="link"
                      onClick={openTermsModal}
                    >
                      terms
                    </Button>{" "}
                    &{" "}
                    <Button
                      style={{ padding: 0 }}
                      type="link"
                      onClick={openPolicyModal}
                    >
                      privacy policy
                    </Button>
                  </Checkbox>

                  {errorMessage ? (
                    <Typography.Text type="danger">
                      {errorMessage}
                    </Typography.Text>
                  ) : null}
                </Space>
              );
            }}
          />

          <CoverDurationModal footer={false}>
            <SelectCoverDuration
              {...{
                personalDetailsForm,
                formErrors,
                onContinue: () => closeCoverDurationModal(),
              }}
            />
          </CoverDurationModal>

          <FrequencyModal footer={false}>
            <SelectFrequency
              {...{
                personalDetailsForm,
                onContinue: () => closeFrequencyModal(),
              }}
            />
          </FrequencyModal>

          <div className="steps-action">
            <Button size="large" type="primary" htmlType="submit">
              Continue
            </Button>
          </div>
        </Space>
      </form>

      <div style={{ display: "none" }}>
        <input {...durationField} />
        <input {...startField} />
        <input {...contributionAmountField} />
      </div>

      <TermsModal className="doc-modal" footer={false}>
        <Space direction="vertical" size={30}>
          <Typography.Title level={4}>Terms & conditions</Typography.Title>

          <EdPolicy />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
          >
            <Button type="ghost" onClick={closeTermsModal}>
              Close
            </Button>
            <Button
              type="primary"
              onClick={() => {
                personalDetailsForm.setValue("agrees_to_terms", true, {
                  shouldValidate: true,
                });
                closeTermsModal();
              }}
            >
              Accept
            </Button>
          </div>
        </Space>
      </TermsModal>

      <PolicyModal className="doc-modal" footer={false}>
        <Space direction="vertical" size={30}>
          <Typography.Title level={4}>Privacy Policy</Typography.Title>

          <EqTerms />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
          >
            <Button type="ghost" onClick={closePolicyModal}>
              Close
            </Button>
          </div>
        </Space>
      </PolicyModal>
    </>
  );
}
