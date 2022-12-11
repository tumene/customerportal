import { Button, Col, PageHeader, Row, Space } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { COLORS } from "../../../../constants/colors";

export default function Failed() {
  const router = useRouter();
  return (
    <div style={{ margin: "30px 0" }}>
      <Space direction="vertical">
        <div style={{ marginBottom: "20px" }}></div>
        <div style={{ marginBottom: "60px" }}>
          <Row align="middle" justify="center">
            <Col md={13} xl={6}>
              <div style={{ margin: "40px 0" }}></div>
              <img src="/assets/images/Failed.svg" alt="" />
            </Col>
            <Col>
              <Space direction="vertical">
                <PageHeader
                  title="We couldn’t complete this payment"
                  footer={
                    <span>
                      Sorry, the details you entered do not match what we have
                      on record,
                      <br /> please take another look
                    </span>
                  }
                />
                <div style={{ marginTop: "60px" }}>
                  <Row>
                    <Col span={8}>
                      <Button block type="primary" onClick={() => {}}>
                        Try again
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Space>
            </Col>
          </Row>
        </div>
      </Space>
    </div>
  );
}
