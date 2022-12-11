import { Button, Checkbox, Space, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";

const REQUIRED_DETAILS = ["Full name", "Phone number", "Email Address"];

export default function LastExpenseRequiredDetails({ close }) {
  const router = useRouter();
  
  return (
    <Space direction="vertical" size={40}>
      <Typography.Title level={4} style={{ maxWidth: "400px" }}>
        You’ll need to provide the following personal details to continue
      </Typography.Title>

      <Space direction="vertical" size={30}>
        {REQUIRED_DETAILS?.map((label, i) => (
          <Checkbox checked={true} key={i}>
            <Typography.Title level={5}>{label}</Typography.Title>
          </Checkbox>
        ))}
      </Space>

      <div style={{ display: "flex", gap: "20px" }}>
        <Button size="large" style={{ flex: 1 }} onClick={close}>
          Cancel
        </Button>
        <Button
          size="large"
          style={{ flex: 1 }}
          type="primary"
          onClick={() => router.push(`/insurance/last-expense`)}
        >
          Continue
        </Button>
      </div>
    </Space>
  );
}
