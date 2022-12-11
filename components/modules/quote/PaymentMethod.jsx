import { Col, Divider, PageHeader, Row, Space } from "antd";
import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../../constants/api";
import { useGlobalContext } from "../../../context/global/provider";
import uuid from "react-uuid";
import { toast } from "react-hot-toast";

export default function PaymentMethod({ onBack, onNext }) {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState();

  const {
    state,
    state1: { data },
    dispatch,
    addData,
  } = useGlobalContext();

  const getReferenceNumber = (url) => {
    axios
      .post(`${BASE_API_URL}Payment/card/checkout`, {
        trackingId: trackingId,
        id: uuid(),
      })
      .then(function (response) {
        let statusCode = response?.data?.statusCode;
        if (statusCode == "00") {
          toast.success(response?.data?.statusMessage);
          let responseData = response?.data?.responseObject;
          let checkoutReference = responseData?.checkoutReference;
          location.assign(
            `${BASE_API_URL}Payment/card/checkoutform?trackingId=${trackingId}&checkOutReference=${checkoutReference}`
          );
        } else {
          toast.error(
            response?.data?.statusMessage ||
              "Unable to generate payment reference at the moment"
          );
        }
      })
      .catch(function (error) {
        toast.error("otp validation fails. Please try again..");
      });
  };

  useEffect(() => {
    let trackingId = data?.trackingId;
    setTrackingId(trackingId);
  }, [data]);
  return (
    <Space direction="vertical">
      <PageHeader title="Payment methods" onBack={onBack} />
      <div>
        <h3>Please select your preferred method of payment</h3>
      </div>
      <div>
        <Row gutter={[10, 10]} align="bottom" wrap>
          <Col span={21}>
            <div style={{ display: "flex" }}>
              <div style={{ paddingRight: "20px" }} md={3} xl={2}>
                <img src="/assets/images/icon2.svg" alt="" />
              </div>
              <div style={{ width: "100%" }}>
                <h3
                  className="pointer"
                  style={{ fontWeight: "400" }}
                  onClick={() => onNext()}
                >
                  Mobile money
                </h3>
                <p className="faint-text ">M-PESA and Airtel Money</p>
                <Divider />
              </div>
            </div>
            {/* <Row align='top' gutter={[10,10]}>
          
          </Row> */}
          </Col>

          <Col span={21}>
            <div style={{ display: "flex" }}>
              <div style={{ paddingRight: "20px" }} md={3} xl={2}>
                <img src="/assets/images/icon2.svg" alt="" />
              </div>
              <div style={{ width: "100%" }}>
                <h3
                  className="pointer"
                  style={{ fontWeight: "400" }}
                  onClick={getReferenceNumber}
                >
                  Pay with a card
                </h3>
                <p className="faint-text ">Credit, prepaid & vIrtual cards</p>
                <Divider />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Space>
  );
}
