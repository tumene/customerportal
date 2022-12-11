import { Button, Col, PageHeader, Row, Space } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../constants/colors";
import {
  clearAllActiveSession,
  getFromStorage,
} from "../../../../utils/dataTypes";

export default function Success({
  data,
  pageHeaderStyle = "",
  middleStyle = "",
  downloadReceipt,
}) {
  const router = useRouter();
  const [currentTrackingId, setCurrentTrackingId] = useState("");
  useEffect(() => {
    let trackingId = getFromStorage("currentTrackingId_equity");
    setCurrentTrackingId(trackingId);
  }, []);

  return (
    <div style={{ margin: "", overflow: "hidden" }}>
      <Space direction="vertical">
        <div
          style={{
            marginBottom: "20px",
            marginTop: "10px",
            textAlign: pageHeaderStyle,
          }}
        >
          <h2>Great!</h2>
          <p className="faint-text">
            {data?.serverMessage || "Your fund transfer was successful"}
          </p>
        </div>
        <div style={{ marginBottom: "60px" }}>
          <Row justify={middleStyle} align="">
            <Col span={12} xl={6}>
              <div style={{ margin: "40px 0" }}></div>
              <img
                src="/assets/images/icon3.svg"
                style={{ width: "100%" }}
                alt=""
              />
            </Col>
            <Col>
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontWeight: "400", textAlign: "start" }}>
                    {data?.amount || "0.00 KES"}
                  </h4>
                  <div className="faint-text" style={{ textAlign: "start" }}>
                    Sent amount
                  </div>
                </div>
                {/* <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontWeight: "400" }}>
                    {data?.charges || "0.00 KES"}
                  </h4>
                  <div className="faint-text">Charges</div>
                </div> */}
                {/* {data?.paymentType.includes("card") ? (
                  <div style={{ marginBottom: "20px" }}>
                    <div>
                      <h4 style={{ fontWeight: "400" }}>
                        Credit Card •••• 2000 American Express..
                      </h4>
                    </div>
                    <div className="faint-text">Pay with a card</div>
                  </div>
                ) : (
                  <div style={{ marginBottom: "20px" }}>
                    <div>
                      <h4 className="faint-text" style={{ fontWeight: "400" }}>
                        More Info
                      </h4>
                      <h4 style={{ fontWeight: "400" }}>Mobile money</h4>
                      <h5 style={{ fontWeight: "400" }} className="faint-text">
                        {data?.paymentType}
                      </h5>
                    </div>
                  </div>
                )} */}
                {data?.transactionReference ? (
                  <div style={{ marginBottom: "20px" }}>
                    <div>
                      {/* <h4 className="faint-text" style={{ fontWeight: "400" }}>
                        Transaction Reference
                      </h4> */}
                      <h4 style={{ fontWeight: "400", textAlign: "start" }}>
                        {" "}
                        {data?.transactionReference}
                      </h4>
                      <div
                        style={{ fontWeight: "400", textAlign: "start" }}
                        className="faint-text"
                      >
                        Transaction Reference
                      </div>
                    </div>
                  </div>
                ) : null}
                {data?.paymentRefrence ? (
                  <div style={{ marginBottom: "20px" }}>
                    <div>
                      <h4 style={{ fontWeight: "400" }}> Payment Reference</h4>
                      <h5 style={{ fontWeight: "400" }} className="faint-text">
                        {data?.paymentRefrence}
                      </h5>
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
        </div>
        <div>
          {data?.paymentType.includes("card") ? (
            <Row gutter={[10, 20]} justify="center" wrap>
              <Col xl={3}>
                <Button
                  block
                  type="primary"
                  onClick={() => {
                    clearAllActiveSession(currentTrackingId);

                    router.push("/");
                  }}
                >
                  Done
                </Button>
              </Col>
              <Col xl={5}>
                <Button
                  block
                  color={COLORS?.theme}
                  onClick={() => {
                    downloadReceipt ? downloadReceipt() : null;
                  }}
                >
                  Download receipt
                </Button>
              </Col>

              <Col xl={3}>
                <Button block>Share</Button>
              </Col>
            </Row>
          ) : (
            <Row gutter={[10, 10]} wrap>
              <Col xl={3}>
                <Button
                  block
                  type="primary"
                  onClick={() => {
                    clearAllActiveSession(currentTrackingId);

                    router.push("/");
                  }}
                >
                  Done
                </Button>
              </Col>
              <Col xl={5}>
                <Button
                  block
                  color={COLORS?.theme}
                  onClick={() => {
                    downloadReceipt ? downloadReceipt() : null;
                  }}
                >
                  Download receipt
                </Button>
              </Col>

              <Col xl={3}>
                <Button block>Share</Button>
              </Col>
            </Row>
          )}
        </div>
      </Space>
    </div>
  );
}
