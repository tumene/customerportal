import { WarningOutlined } from "@ant-design/icons";
import { Button, Col, Input, PageHeader, Row, Space, Typography } from "antd";
import useModal from "antd/lib/modal/useModal";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { REGEX_PATTERNS } from "../../../../../constants/errors";

import { BaseInput } from "../../../../ui/atoms/baseInput";

export default function PaymentDetails({ onNext ,payToAccountForm}) {
  const router = useRouter();
  const { id } = router.query;
  const {handleSubmit, control} =payToAccountForm

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
      <PageHeader title={"Payment details"} onBack={() => router.back()} />

      <Space direction="vertical">
        <Row gutter={[30, 30]}>
          <Col span={24}>
            <PageHeader title="Please use the below details to make payments" />
          </Col>

          <Col span={18}>
            <Row gutter={55}>
              <Col span={12}>
              <Controller
                    name="referenceno"
                    control={control}
                    rules={{ required: "Transaction reference number is required",
                    pattern: REGEX_PATTERNS.NUMBER 
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.referenceno?.message;
                      return (
                <BaseInput
                  label={"Transaction reference number"}
                  placeholder="833777747389"
                  name="referenceno"
                  // options={[]}
                  {...{ value, onChange, errors: [errorMessage] }}
                  />
                );
              }}
            />
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>

      <div style={{ marginTop: "30px" }}>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          // disabled={disableSubmit}
        >
          Proceed
        </Button>
      </div>
    </form>
  );
}
