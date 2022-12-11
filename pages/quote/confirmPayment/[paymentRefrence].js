import {
  Button,
  Col,
  Input,
  Modal,
  PageHeader,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Success from "../../../components/modules/quote/payment/Success";
import { useGlobalContext } from "../../../context/global/provider";
import {
  clearAllActiveSession,
  formatAmount,
  getFromStorage,
} from "../../../utils/dataTypes";

export default function index() {
  const router = useRouter();
  const { paymentRefrence } = router?.query;
  const [paymentStatus, setPaymentStatus] = useState("");
  const [showBuyNowButton, setBuyNowButtonVisibility] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [currentTrackingId, setCurrentTrackingId] = useState("");
  const [paymentResponse, setPaymentResponse] = useState({});

  useEffect(() => {
    if (router?.query) {
      let payStatus = router?.query?.transactionStatus;
      let message = router?.query?.message;
      setPaymentStatus(payStatus);
      setServerMessage(message);
      setPaymentResponse(router?.query);
      let trackingId = getFromStorage("currentTrackingId_equity");
      setCurrentTrackingId(trackingId);
    }
  }, [router?.query]);

  const reTryPayment = () => {
    let route = `/onboard-retailer/${currentTrackingId}`;
    location.replace(route);
  };
  const cancelPaymentFlow = () => {
    clearAllActiveSession(currentTrackingId);
    location.replace("/");
  };
  return paymentStatus == "FAILED" ? (
    <div direction="vertical">
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <h2>Payment unsuccessful</h2>
        <p className="faint-text">{serverMessage}</p>
      </div>
      <div style={{ marginTop: "15px", overflow: "hidden" }}>
        <Row gutter={[10, 10]} justify="center" wrap>
          <Col>
            <Button type="primary" onClick={reTryPayment}>
              try Again
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={cancelPaymentFlow}>
              cancel
            </Button>
          </Col>
        </Row>
        {/* <Button type="link">Learn more</Button> */}
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <Success
        {...{ showBuyNowButton }}
        // onBack={() => setActiveScreenId("benefits")}
        pageHeaderStyle="center"
        middleStyle="center"
        data={{
          amount: `${formatAmount(paymentResponse?.transactionAmount)} ${
            paymentResponse?.transactionCurrency
          }`,
          charges: "0 KES",
          paymentType: "Pay with a card",
          transactionReference: `${paymentResponse?.transactionReference}`,
          // paymentRefrence: `${paymentResponse?.paymentRefrence}`,
          serverMessage: `${paymentResponse?.message}`,
        }}
      />
    </div>
  );
}
