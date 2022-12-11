import { Row, Space, Button, Col, Typography } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";

export default function LastExpenseQuote({
  lastExpenseValues,
  generateQuote,
  generatingQuote,
}) {
  const onNext = (screen) => {
    generateQuote(screen);
  };

  const { personalDetails, selectedPackage } = lastExpenseValues;

  return (
    <>
      <Space direction="vertical" size={50}>
        <Space direction="vertical" size="large">
          <h3>To continue, please confirm your insurance purchase details</h3>

          <Space direction="vertical" size="middle">
            <Row>
              <Col span={12}>
                <Typography.Text className="faint-text">
                  Product
                </Typography.Text>
                <p>Funeral Expense</p>
              </Col>
              <Col span={12}>
                <Typography.Text className="faint-text">
                  Premium package
                </Typography.Text>
                <p>{selectedPackage.name}</p>
              </Col>
              <Col span={12}>
                <Typography.Text className="faint-text">
                  Total benefit
                </Typography.Text>
                <p>
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    value={selectedPackage?.benefit}
                  />{" "}
                  KES
                </p>
              </Col>
              <Col span={12}>
                <Typography.Text className="faint-text">
                  Premium
                </Typography.Text>
                <p>
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    value={selectedPackage?.premium}
                  />{" "}
                  KES
                </p>
              </Col>
            </Row>

            <h3>Personal Details</h3>
            <Row>
              <Col span={12}>
                <Space direction="vertical">
                  <div>
                    <Typography.Text className="faint-text">
                      Full name
                    </Typography.Text>
                    <p>
                      {personalDetails?.first_name ? (
                        <>
                          {personalDetails?.first_name}{" "}
                          {personalDetails?.last_name}
                        </>
                      ) : (
                        "-"
                      )}
                    </p>
                  </div>
                </Space>
              </Col>

              <Col span={12}>
                <Space direction="vertical">
                  <div>
                    <Typography.Text className="faint-text">
                      Email address
                    </Typography.Text>
                    <p>{personalDetails?.email_address || "-"}</p>
                  </div>
                </Space>
              </Col>

              <Col span={12}>
                <Space direction="vertical">
                  <div>
                    <Typography.Text className="faint-text">
                      Mobile number
                    </Typography.Text>
                    <p>{personalDetails.mobile_number || "-"}</p>
                  </div>
                </Space>
              </Col>
            </Row>
          </Space>
        </Space>

        <Space size="middle">
          <Button
            type="primary"
            loading={generatingQuote}
            onClick={() => onNext?.("quote-pdf-screen--buy-now")}
          >
            Get quote and buy now
          </Button>
          <Button
            type="outlined"
            loading={generatingQuote}
            onClick={() => onNext?.("quote-pdf-screen--buy-later")}
          >
            Get quote and buy later
          </Button>
        </Space>
      </Space>
    </>
  );
}
