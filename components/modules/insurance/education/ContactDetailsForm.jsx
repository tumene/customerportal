import { Button, Col, Input, Row, Space, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import {
  generateMaxLength,
  REGEX_PATTERNS,
} from "../../../../constants/errors";
import { countryCodeList } from "../../../../constants/storage";
import { arrayToSelectOptions } from "../../../../utils/dataTypes";
import { saveContactDetailsToStorage } from "../../../../utils/storage";
import { BaseInput } from "../../../ui/atoms/baseInput";
import { BaseSelect } from "../../../ui/atoms/baseSelect";

export default function ContactDetailsForm({
  handleContactDetailsSubmit,
  personalDetailsForm,
  generatingQuote,
  backBtn,
}) {
  const { control, handleSubmit } = personalDetailsForm;

  const onSubmit = () => {
    handleContactDetailsSubmit();
    saveContactDetailsToStorage({
      first_name: personalDetailsForm?.getValues("first_name"),
      last_name: personalDetailsForm?.getValues("last_name"),
      mobile_number: personalDetailsForm?.getValues("mobile_number"),
      email: personalDetailsForm?.getValues("email"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                    required: "Enter a valid first name",
                    pattern: REGEX_PATTERNS.LETTERS,
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.first_name?.message;

                    return (
                      <BaseInput
                        type="text"
                        label="Enter first name"
                        placeholder="Enter your first name"
                        {...{
                          value,
                          onChange,
                          errors: [errorMessage],
                        }}
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
                    required: "Enter a valid last name",
                    pattern: REGEX_PATTERNS.LETTERS,
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.last_name?.message;

                    return (
                      <BaseInput
                        type="text"
                        label="Enter last name"
                        placeholder="Enter your last name"
                        {...{
                          value,
                          onChange,
                          errors: [errorMessage],
                        }}
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
                    required: "Enter a valid mobile number",
                    pattern: REGEX_PATTERNS.NUMBER,
                    maxLength: generateMaxLength(),
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.mobile_number?.message;

                    return (
                      <label>
                        <div className="base-input__label">Mobile number</div>
                        <Input.Group compact>
                          <Controller
                            name="country_code"
                            control={control}
                            rules={{
                              required: "countryCode is required",
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
                                  placeholder="mobile code"
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
                    );
                  }}
                />
              </Col>

              <Col span={12}>
                <Controller
                  name="email_address"
                  control={control}
                  rules={{
                    required: "Enter your email address",
                    pattern: REGEX_PATTERNS.EMAIL,
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.email_address?.message;

                    return (
                      <BaseInput
                        type="email"
                        label="Enter email"
                        placeholder="Enter your email address"
                        {...{
                          value,
                          onChange,
                          errors: [errorMessage],
                        }}
                      />
                    );
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <br />

        <div className="steps-action">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={generatingQuote}
          >
            Continue
          </Button>

          {backBtn}
        </div>
      </Space>
    </form>
  );
}
