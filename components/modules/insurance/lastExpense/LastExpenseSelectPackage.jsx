import { Col, Typography, Space, Row, Radio, Button, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { groupArrayBy } from "../../../../utils/dataTypes";
import useGetLastExpensePackages from "../../../api/useGetLastExpensePackages";
import { NumericFormat } from "react-number-format";

export default function LastExpenseSelectPackage({
  openPackageModal,
  backBtn,
  setSelectedPackage,
  selectedPackage,
}) {
  const next = openPackageModal;
  const [lastExpensePackages, setLastExpensePackages] = useState();
  const handlePackageChange = ({ target }) => {
    const packagesById = groupArrayBy(lastExpensePackages, "id");
    const selectedPackageData = packagesById?.[target?.value]?.[0];
    setSelectedPackage(selectedPackageData);
  };
  const getLastExpensePackagesApi = useGetLastExpensePackages();
  const getLastExpensePackages = async () => {
    try {
      const response = await getLastExpensePackagesApi.fetch();
      setLastExpensePackages(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getLastExpensePackages();
  }, []);

  return (
    <>
      <Space direction="vertical" size={50}>
        <Space direction="vertical">
          <h3> Please select your preferred premium package</h3>
          <p className="faint-text">
            The benefit covers the principal member and is payable to the
            nominated beneficiary.
          </p>

          <Radio.Group
            style={{ marginTop: 16 }}
            onChange={handlePackageChange}
            value={selectedPackage?.id}
          >
            <Row gutter={[33, 33]}>
              {!lastExpensePackages
                ? [...Array(6)].map((_, i) => (
                    <Col key={i} span={8}>
                      <Skeleton active />
                    </Col>
                  ))
                : null}
              {lastExpensePackages?.map?.((packageDetails, i) => (
                <Col span={8} key={i}>
                  <Radio.Button
                    value={packageDetails.id}
                    style={{ padding: "20px" }}
                  >
                    <Space direction="vertical" size="middle">
                      <h3>{packageDetails.name}</h3>

                      <Space direction="vertical">
                        <Typography.Text type="secondary">
                          Benefit:{" "}
                          <NumericFormat
                            value={packageDetails.benefit}
                            displayType="text"
                            thousandSeparator=","
                          />{" "}
                          KES
                        </Typography.Text>
                        <Typography.Text type="secondary">
                          Premium:{" "}
                          <NumericFormat
                            value={packageDetails.premium}
                            displayType="text"
                            thousandSeparator=","
                          />{" "}
                          KES
                        </Typography.Text>
                      </Space>
                    </Space>
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </Space>

        <div>
          <Button
            type="primary"
            size="large"
            onClick={next}
            disabled={!selectedPackage?.id}
          >
            Continue
          </Button>

          {backBtn}
        </div>
      </Space>
    </>
  );
}
