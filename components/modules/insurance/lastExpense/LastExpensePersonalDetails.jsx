import React from "react";
import { Col, Row, Checkbox, Space, Button, Typography, Input } from "antd";
import { BaseInput } from "../../../ui/atoms/baseInput";
import { Controller } from "react-hook-form";
import {
  generateMaxLength,
  REGEX_PATTERNS,
} from "../../../../constants/errors";
import { saveContactDetailsToStorage } from "../../../../utils/storage";
import useModal from "../../../../hooks/useModal";
import LxPolicy from "../LxPolicy";
import { BaseSelect } from "../../../ui/atoms/baseSelect";
import EqTerms from "../EqTerms";
import { countryCodeList } from "../../../../constants/storage";
import { arrayToSelectOptions } from "../../../../utils/dataTypes";

export default function LastExpensePersonalDetails({
  next,
  backBtn,
  lastExpensePersonalForm,
}) {
  const { handleSubmit, control } = lastExpensePersonalForm;

  const [PrivacyModal, openPrivacyModal, closePrivacyModal] = useModal();
  const [TermsModal, openTermsModal, closeTermsModal] = useModal();

  const submitPersonalForm = () => {
    saveContactDetailsToStorage({
      first_name: lastExpensePersonalForm?.getValues("first_name"),
      last_name: lastExpensePersonalForm?.getValues("last_name"),
      mobile_number: lastExpensePersonalForm?.getValues("mobile_number"),
      email: lastExpensePersonalForm?.getValues("email_address"),
    });
    next();
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitPersonalForm)}>
        <Space direction="vertical" size="large">
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <div>
                <h3>Please enter your details</h3>
                <p className="faint-text">
                  Please enter your personal details to continue
                </p>
              </div>
            </Col>

            <Col span={24}>
              <Row gutter={[55, 55]}>
                <Col span={12}>
                  <Controller
                    name="first_name"
                    control={control}
                    rules={{
                      required: "First name is required",
                      pattern: REGEX_PATTERNS.LETTERS,
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.first_name?.message;

                      return (
                        <BaseInput
                          label="First name"
                          placeholder="Enter your first name"
                          {...{ value, onChange, errors: [errorMessage] }}
                        />
                      );
                    }}
                  />
                </Col>

                <Col span={12}>
                  <Controller
                    name="last_name"
                    control={control}
                    rules={{
                      required: "Last name is required",
                      pattern: REGEX_PATTERNS.LETTERS,
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.last_name?.message;

                      return (
                        <BaseInput
                          label="Last name"
                          placeholder="Enter your last name"
                          {...{ value, onChange, errors: [errorMessage] }}
                        />
                      );
                    }}
                  />
                </Col>

                <Col span={12}>
                  <Controller
                    name="email_address"
                    control={control}
                    rules={{
                      required: "Email address is required",
                      pattern: REGEX_PATTERNS.EMAIL,
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.email_address?.message;

                      return (
                        <BaseInput
                          label="Email address"
                          placeholder="Enter your email address"
                          {...{ value, onChange, errors: [errorMessage] }}
                        />
                      );
                    }}
                  />
                </Col>

                <Col span={12}>
                  <Controller
                    name="mobile_number"
                    control={control}
                    rules={{
                      required: "Mobile number is required",
                      pattern: REGEX_PATTERNS.NUMBER,
                      maxLength: generateMaxLength(),
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.mobile_number?.message;

                      return (
                        <>
                          <label>
                            <div className="base-input__label">
                              Mobile number
                            </div>
                            <Input.Group compact>
                              <Controller
                                name="country_code"
                                control={control}
                                rules={{
                                  required: "country code is required",
                                  pattern: REGEX_PATTERNS.NUMBER,
                                  maxLength: generateMaxLength(),
                                }}
                                render={({
                                  field: { value, onChange },
                                  formState: { errors },
                                }) => {
                                  const errorMessage =
                                    errors?.country_code?.message;

                                  return (
                                    <BaseSelect
                                      placeholder="Select code"
                                      options={arrayToSelectOptions(
                                        countryCodeList
                                      )}
                                      {...{
                                        value,
                                        onChange,
                                        errors: [errorMessage],
                                      }}
                                    />
                                  );
                                }}
                              />
                              <BaseInput
                                placeholder="Enter your mobile number"
                                maxLength={generateMaxLength().value}
                                {...{ value, onChange }}
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
                        </>
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
                      onClick={openPrivacyModal}
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

          <div>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              onClick={async () => {
                const result = await lastExpensePersonalForm.trigger();
                if (result) submitPersonalForm();
              }}
            >
              Continue
            </Button>
          </div>
        </Space>
      </form>

      <TermsModal className="doc-modal" footer={false}>
        <Space direction="vertical" size={30}>
          <Typography.Title level={4}>Terms & conditions</Typography.Title>
          <LxPolicy />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
          >
            <Button type="ghost" onClick={closeTermsModal}>
              Close
            </Button>
            <Button
              type="primary"
              onClick={() => {
                lastExpensePersonalForm.setValue("agrees_to_terms", true, {
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

      <PrivacyModal className="doc-modal" footer={false}>
        <Space direction="vertical" size={30}>
          <Typography.Title level={4}>Privacy Policy</Typography.Title>
          <EqTerms />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
          >
            <Button type="ghost" onClick={closePrivacyModal}>
              Close
            </Button>
          </div>
        </Space>
      </PrivacyModal>
    </>
  );
}
