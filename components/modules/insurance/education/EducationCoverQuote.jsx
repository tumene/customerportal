import { Row, Space, Button, Col, Typography, Skeleton } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import uuid from "react-uuid";
import {
  MAP_EDUCATION_POLICY_PRODUCT_TO_ID,
  MAP_EDUCATION_POLICY_PRODUCT_TO_LABEL,
  PAYMENT_FREQUENCIES_BY_NAME,
} from "../../../../constants/insuranceResources";
import useCalculateQuotePremium from "../../../api/useCalculateQuotePremium";
// import { NumericFormat } from "react-number-format";

export default function EducationCoverQuote({
  onNext,
  // selectedBenefits,
  generatingQuote,
  personalDetailsForm,
}) {
  const calculateQuotePremiumApi = useCalculateQuotePremium();
  const details = personalDetailsForm?.getValues();
  const router = useRouter();
  const { id: policyProductId } = router.query;
  const [calculatingPremium, setCalculatingPremium] = useState(false);
  const [calculatorResponse, setCalculatorResponse] = useState();

  const calculateQuotePremium = async () => {
    setCalculatingPremium(true);

    try {
      const response = await calculateQuotePremiumApi.fetch({
        // premiumPackageId: selectedPackage.id,
        educationPolicyProduct:
          MAP_EDUCATION_POLICY_PRODUCT_TO_ID[policyProductId],
        amount: details.amount,
        numberOfYears: details?.duration,
        dateOfBirth: details?.date_of_birth,
        paymentFrequency:
          PAYMENT_FREQUENCIES_BY_NAME[details?.payment_frequency]?.[0]?.id,
        id: uuid(),
      });

      if (response?.data?.successful === false) {
        toast.error(response?.data?.statusMessage);
      } else {
        setCalculatorResponse(response?.data?.responseObject);
        setCalculatingPremium(false);
      }
    } catch (error) {
      const message = error?.response?.data?.statusMessage;
      toast.error(message || "An error occurred please try again later");
    }
  };

  useEffect(() => {
    calculateQuotePremium();
  }, []);

  return (
    <Space direction="vertical" size={50}>
      {calculatingPremium && !calculatorResponse ? (
        <>
          <Space direction="vertical" size={30}>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </Space>
        </>
      ) : (
        <>
          <Space direction="vertical" size="large">
            <h3>To continue, please confirm your insurance purchase details</h3>

            <Space direction="vertical" size="middle">
              <Row gutter={[25, 25]}>
                <Col span={12}>
                  <Typography.Text className="faint-text">
                    Product
                  </Typography.Text>
                  <p>Education savings</p>
                </Col>

                <Col span={12}>
                  <Typography.Text className="faint-text">
                    {details?.payment_frequency} Investment & Risk Premium
                  </Typography.Text>
                  <p>
                    <NumericFormat
                      value={calculatorResponse?.totalPremium}
                      displayType="text"
                      thousandSeparator=","
                    />{" "}
                    KES
                  </p>
                </Col>

                <Col span={12}>
                  <Typography.Text className="faint-text">
                    Target Type
                  </Typography.Text>
                  <p>
                    {MAP_EDUCATION_POLICY_PRODUCT_TO_LABEL[policyProductId]}
                  </p>
                </Col>

                <Col span={12}>
                  <Typography.Text className="faint-text">
                    Total investment premiums
                  </Typography.Text>
                  <p>
                    <NumericFormat
                      value={calculatorResponse?.totalInvestmentPremium}
                      displayType="text"
                      thousandSeparator=","
                    />{" "}
                    KES
                  </p>
                </Col>

                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Typography.Text className="faint-text">
                        Terms Years
                      </Typography.Text>
                      <p>{details?.duration || "-"} year(s)</p>
                    </div>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Typography.Text className="faint-text">
                        Total life cover premiums
                      </Typography.Text>
                      <p>
                        <NumericFormat
                          value={calculatorResponse?.totalRiskPremium}
                          displayType="text"
                          thousandSeparator=","
                        />{" "}
                        KES
                      </p>
                    </div>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Typography.Text className="faint-text">
                        Premium contribution frequency
                      </Typography.Text>
                      <p>{details?.payment_frequency || "-"}</p>
                    </div>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Typography.Text className="faint-text">
                        Total premium contribution
                      </Typography.Text>
                      <p>
                        <NumericFormat
                          value={calculatorResponse?.totalPremiumsPaid}
                          displayType="text"
                          thousandSeparator=","
                        />{" "}
                        KES
                      </p>
                    </div>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Typography.Text className="faint-text">
                        {MAP_EDUCATION_POLICY_PRODUCT_TO_LABEL[policyProductId]}
                      </Typography.Text>
                      <p>
                        <p>
                          <NumericFormat
                            value={details?.amount}
                            displayType="text"
                            thousandSeparator=","
                          />{" "}
                          KES
                        </p>
                      </p>
                    </div>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Typography.Text className="faint-text">
                        Fund Value at maturity
                      </Typography.Text>
                      <p>
                        <p>
                          <NumericFormat
                            value={calculatorResponse?.fundValueAtMaturity}
                            displayType="text"
                            thousandSeparator=","
                          />{" "}
                          KES
                        </p>
                      </p>
                    </div>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space direction="vertical">
                    <div>
                      <Typography.Text className="faint-text">
                        Investment income earned
                      </Typography.Text>
                      <p>
                        <p>
                          <NumericFormat
                            value={
                              calculatorResponse?.fundValueAtMaturity -
                              calculatorResponse?.totalPremiumsPaid
                            }
                            displayType="text"
                            thousandSeparator=","
                            decimalScale={2}
                          />{" "}
                          KES
                        </p>
                      </p>
                    </div>
                  </Space>
                </Col>
              </Row>

              {/* <>
            <h3>Selected Benefits</h3>

            {selectedBenefits?.length > 0 ? (
              <Space direction="horizontal" size={10} wrap>
                {selectedBenefits?.map((benefit) => (
                  <Tag>{benefit.name}</Tag>
                ))}
              </Space>
            ) : (
              <Typography.Paragraph type="secondary" italic>
                No selected benefits
              </Typography.Paragraph>
            )}
          </> */}
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
        </>
      )}
    </Space>
  );
}
