import React, { useMemo } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, PageHeader, Row, Space, Typography } from "antd";
import { BaseInput } from "../../../ui/atoms/baseInput/";
import { Controller } from "react-hook-form";
import { BaseSelect } from "../../../ui/atoms/baseSelect";
import {
  generateMaxLength,
  REGEX_PATTERNS,
} from "../../../../constants/errors";
import { arrayToSelectOptions } from "../../../../utils/dataTypes";
import { countryCodeList } from "../../../../constants/storage";

export default function RequestCallbackForm({
  onSuccess,
  requestCallBackForm,
  requestingCallback,
  onBack,
}) {
  const { control, handleSubmit, getValues } = requestCallBackForm || {};
  const defaultDetails = useMemo(() => {
    return getValues();
  }, []);

  return (
    <form onSubmit={handleSubmit?.(onSuccess)}>
      <PageHeader title={"Request Callback"} onBack={onBack} />
      <Row gutter={[30, 30]}>
        <Col span={24}>
          <div>
            <h3>
              Please {defaultDetails.first_name ? "confirm" : "enter"} your
              details
            </h3>
            <p className="faint-text">
              These are the details our agent will use to contact you
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
                  max: 10,
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
                            required: "country code is required",
                            pattern: REGEX_PATTERNS.NUMBER,
                            maxLength: generateMaxLength(3),
                          }}
                          render={({
                            field: { value, onChange },
                            formState: { errors },
                          }) => {
                            const errorMessage = errors?.country_code?.message;

                            return (
                              <BaseSelect
                                placeholder="Select code"
                                options={arrayToSelectOptions(countryCodeList)}
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

        <Col span={24}>
          <Space size={30} direction="vertical">
            {defaultDetails.first_name ? (
              <Space align="center" direction="horizontal">
                <ExclamationCircleOutlined />
                <Typography.Text type="secondary">
                  Edit any field before clicking submit if necessary
                </Typography.Text>
              </Space>
            ) : null}

            <Button
              type="primary"
              size="large"
              loading={requestingCallback}
              onClick={onSuccess}
            >
              Submit
            </Button>
          </Space>
        </Col>
      </Row>
    </form>
  );
}
