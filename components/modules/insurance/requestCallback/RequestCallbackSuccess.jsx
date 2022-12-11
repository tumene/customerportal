import { Button, Col, Row, Space, Typography } from "antd";
import AnchorLink from "antd/lib/anchor/AnchorLink";
import React from "react";
import Link from "next/link";
import HandShake from "../../../ui/icons/HandShake";

export default function RequestCallbackSuccess() {
  return (
    <Space
      size={100}
      style={{ marginTop: "100px", marginLeft: "100px" }}
      align="center"
    >
      <Space size={30} direction="vertical">
        <Typography.Title>Your request was successful</Typography.Title>
        <Typography.Paragraph>
          One of our agents will contact you in the next 24 hours
        </Typography.Paragraph>

        <Link href="/">
          <Button type="primary" size="large">
            All Done
          </Button>
        </Link>
      </Space>
      <HandShake />
    </Space>
  );
}
