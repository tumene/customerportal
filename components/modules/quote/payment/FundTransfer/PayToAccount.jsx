import { WarningOutlined } from "@ant-design/icons";
import { Button, Col, Input, PageHeader, Row, Space, Typography } from "antd";
import useModal from "antd/lib/modal/useModal";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CURRENCIES } from "../../../../../constants/currency";
import { Controller } from "react-hook-form";
import { arrayToSelectOptions } from "../../../../../utils/dataTypes";
import { BaseInput } from "../../../../ui/atoms/baseInput";
import { BaseSelect } from "../../../../ui/atoms/baseSelect";
import { REGEX_PATTERNS } from "../../../../../constants/errors";

export default function PayToAccount({ onNext, payToAccountForm }) {
  const router = useRouter();
  const { id } = router.query;
  const { handleSubmit, control } = payToAccountForm;

  const [ConsiderThirdPartyModal, openConsiderThirdPartyModal] = useModal();

  const [formData, setFormData] = useState({
    amount: "",
    currency: "",
    ref: "",
    to: "",
  });

  const handleFormFieldChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <PageHeader title={"Pay to an account"} onBack={() => router.back()} />

      <Space direction="vertical">
        <Row gutter={[30, 30]}>
          <Col span={24}>
            <PageHeader title="Please use the below details to make payments" />
          </Col>

          <Col span={18}>
            <Row gutter={55}>
              <Col span={12}>
                <Controller
                  name="to"
                  control={control}
                  rules={{ required: "Account Number is required" }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.to?.message;
                    return (
                      <BaseInput
                        label={
                          <>
                            <p>Send to</p>
                            <span>ELAK</span>
                          </>
                        }
                        placeholder="833777747389"
                        name="to"
                        {...{ value, onChange, errors: [errorMessage] }}
                      />
                    );
                  }}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="ref"
                  control={control}
                  rules={{
                    required: "Reference Number is required",
                    pattern: REGEX_PATTERNS.NUMBER,
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.ref?.message;
                    return (
                      <BaseInput
                        label="Reference number"
                        placeholder="728282828"
                        name="ref"
                        // options={[]}
                        {...{ value, onChange, errors: [errorMessage] }}
                      />
                    );
                  }}
                />
              </Col>

              <Col span={12}>
                <Space direction="vertical">
                  <div>
                    <span className="base-input__label">Amount</span>
                    <Input.Group compact>
                      <Controller
                        name="currency"
                        control={control}
                        rules={{ required: "Currency  is required" }}
                        render={({
                          field: { value, onChange },
                          formState: { errors },
                        }) => {
                          const errorMessage = errors?.currency?.message;
                          return (
                            <BaseSelect
                              placeholder="KES"
                              name="currency"
                              options={arrayToSelectOptions(CURRENCIES)}
                              {...{ value, onChange, errors: [errorMessage] }}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="amount"
                        control={control}
                        rules={{
                          required: "Amount  is required",
                          pattern: REGEX_PATTERNS.NUMBER,
                        }}
                        render={({
                          field: { value, onChange },
                          formState: { errors },
                        }) => {
                          const errorMessage = errors?.amount?.message;
                          return (
                            <BaseInput
                              value={formData.amount}
                              placeholder="Enter an amount"
                              name="amount"
                              {...{ value, onChange, errors: [errorMessage] }}
                            />
                          );
                        }}
                      />
                    </Input.Group>
                  </div>
                  <div style={{ margin: "20px 0" }}>
                    <Typography.Text className="faint-text">
                      <WarningOutlined twoToneColor="black" /> Capture the
                      reference number when making the payments
                    </Typography.Text>
                  </div>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>

      <div style={{ marginTop: "30px" }}>
        <Button type="primary" size="large" htmlType="submit">
          Proceed
        </Button>
      </div>
    </form>
  );
}
