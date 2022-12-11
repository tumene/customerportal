import { Button, Col, Input, PageHeader, Row, Space } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../constants/colors";
import { Typography } from "antd";
import Countdown from "react-countdown";
const { Title } = Typography;
import ReactCodeInput from "react-code-input";
import { useGlobalContext } from "../../../context/global/provider";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_API_URL } from "../../../constants/api";
import uuid from "react-uuid";

export default function VerifySMS({
  OtpReferenceData,
  onBack,
  onNext,
  confirmRegistration,
  userData,
}) {
  const router = useRouter();
  const [valueInput, setValueInput] = useState(false);
  const [valid, setValid] = useState(true);
  const [Data, setData] = useState();
  const [trackingId, setTrackingId] = useState(null);
  const [otpReference, setOtpReference] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    state,
    state1: { data },
    dispatch,
    addData,
  } = useGlobalContext();

  useEffect(() => {
    setOtpReference(OtpReferenceData);
  }, [OtpReferenceData]);

  const handleValueInput = (e) => {
    if (String(e).replace(/[A-Za-z]/g, "").length === 6) {
      setValueInput(true);
      if (e !== "222222") {
        setValid(false);
      } else {
        setValid(true);
      }
    } else {
      setValueInput(false);
    }
    setData(e);
  };

  const handleOnSubmit = () => {
    setLoading(true);
    axios
      .post(`${BASE_API_URL}Onboarding/verifyotp`, {
        trackingId: trackingId,
        otp: Data,
        id: uuid(),
        otpReference: otpReference?.otpReference,
      })
      .then(function (response) {
        let statusCode = response?.data?.statusCode;
        if (statusCode == "00") {
          toast.success(response?.data?.statusMessage);
          setLoading(false);
          // router.push('/quote')
          // toast.success(response?.data?.statusMessage)
          // router.push("/quote");
          onNext();
        } else {
          toast.error(
            response?.data?.statusMessage ||
              "otp validation fails. Please try again"
          );
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        toast.error("otp validation fails. Please try again..");
      });
  };
  useEffect(() => {
    let trackingId = data?.trackingId;
    setTrackingId(trackingId);
  }, [data]);
  return (
    <div style={{ overflow: "hidden" }}>
      <Space direction="vertical">
        <Row gutter={[50, 10]}>
          <Col span={14}>
            <div className="test">
              <div style={{ padding: "40px" }}>
                <img src="/assets/images/logo.svg" alt="" />
              </div>
              <div style={{ padding: "40px", color: "#fff" }}>
                <div
                  style={{
                    color: "#fff",
                    fontSize: "48px",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  Welcome to
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: "48px",
                    marginBottom: "10px",
                  }}
                >
                  Equity online
                </div>
                <p>More than just banking</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ paddingLeft: "30px" }}>
              <PageHeader
                className="site-page-header"
                onBack={() => (onBack ? onBack() : null)}
                title="Register"
              />
            </div>
            <div>
              <h4>
                We sent a verification code to{" "}
                {userData?.mobileNumber?.slice(0, 3)} ••••{" "}
                {userData?.mobileNumber?.slice(
                  userData?.mobileNumber?.length - 4,
                  userData?.mobileNumber?.length
                )}
              </h4>
              <p className="faint-text">Please enter the code below</p>
            </div>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <img src="/assets/images/Group.svg" alt="" />
            </div>
            <div>
              <Row gutter={[15, 15]} justify="center">
                <ReactCodeInput
                  name="resetPassword"
                  inputMode="numeric"
                  fields={6}
                  type="text"
                  onChange={(e) => {
                    handleValueInput(e);
                  }}
                  isValid={valid}
                />
              </Row>
            </div>

            <div style={{ marginTop: "50px" }}>
              <Row gutter={[15, 15]} justify="center">
                <Col span={8}>
                  <Button
                    type="default"
                    disabled={!valueInput || loading}
                    onClick={handleOnSubmit}
                    block
                  >
                    Verify
                  </Button>
                </Col>
                <Col span={10}>
                  <Button
                    disabled={Date.now() + 64000 != 0 ? true : false}
                    type="default"
                    onClick={() => {}}
                    block
                  >
                    <Countdown date={Date.now() + 64000}>
                      <div>Resend Code</div>
                    </Countdown>
                  </Button>
                </Col>
                <Col xl={18}>
                  <Button
                    size="large"
                    danger
                    color={COLORS?.theme}
                    onClick={() => {}}
                    style={{ fontWeight: "600", padding: "5px 0" }}
                    block
                  >
                    Change the mobile number
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
