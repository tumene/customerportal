import {
  Button,
  Card,
  Col,
  Descriptions,
  Modal,
  PageHeader,
  Row,
  Space,
  Typography,
} from "antd";
const { Text, Title } = Typography;
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/global/provider";
import useModal from "../../../hooks/useModal";
import useModalFlow from "../../../hooks/useModalFlow";
import {
  formatAmount,
  getFromStorage,
  saveToLocalStorage,
} from "../../../utils/dataTypes";
import uuid from "react-uuid";
import { toast } from "react-hot-toast";

//Image
import TopImage from "../../../public/assets/images/o1.svg";
import { BASE_API_URL } from "../../../constants/api";
import Success from "./payment/Success";
import Home from "../homeInsurance/Home";

export default function QuoteHome({ onNext, onBack }) {
  const router = useRouter();

  const [MotorInsuranceModal, openMotorInsuranceModal] = useModal();
  const [getInsurance, setInsurance] = useState();
  const [activeScreenId, setActiveScreenId] = useState("");
  const [selectedUseId, setSelectedUseId] = useState("");
  const {
    state,
    state1: { data },
    dispatch,
    addData,
  } = useGlobalContext();
  const [trackingId, setTrackingId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaderModalOpen, setIsLoaderModalOpen] = useState(false);
  const [unsuccessful, setUnsuccessful] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState({});
  const [currentTrackingId, setCurrentTrackingId] = useState("");
  const [pendingQuote, setPendingQuote] = useState("");

  const handleQuoteGenerationDetails = () => {
    openMotorInsuranceModal(true);
  };

  const motorScreens = [
    {
      id: "screen-1",
      Component: (
        <div>
          <div>
            <h3 style={{ textAlign: "center" }}>
              To continue, please confirm your Insurance purchase
            </h3>
          </div>
          <div
            className="site-page-header-ghost-wrapper"
            style={{ marginBottom: "100px" }}
          >
            <PageHeader
              ghost={false}

              // title="Title"
              // subTitle="This is a subtitle"
            >
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <Text className="faint-text" strong={false}>
                    Product
                  </Text>
                  <h3>{data?.product || "-"}</h3>
                </Col>
                <Col span={12}>
                  <Text className="faint-text" strong={false}>
                    Amount
                  </Text>
                  <h3>
                    {formatAmount(data?.amount || 0)} {data?.currency}
                  </h3>
                </Col>
                <Col span={12}>
                  <Text className="faint-text" strong={false}>
                    To
                  </Text>
                  {/* <h3>{data?.receiverName}</h3> */}
                  <h3> </h3>
                  <Text className="faint-text" strong={false}>
                    Equity Life Insurance
                  </Text>
                </Col>
                {/* <Col span={12}>
                  <Text className="faint-text" strong={false}>
                    Charges
                  </Text>
                  <h3>
                    {data?.charges || 0} {data?.currency}
                  </h3>
                </Col> */}
              </Row>
            </PageHeader>
          </div>
          <Col span={10}>
            <Button
              type="primary"
              //  onClick={() => onNext()}
              onClick={() => getReferenceNumber()}
              block
            >
              Proceed to payment
            </Button>
          </Col>
        </div>
      ),
    },
  ];

  const [MotorInsuranceFlow] = useModalFlow({
    activeScreenId,
    screens: motorScreens,
  });

  useEffect(() => {
    let trackingId = data?.trackingId;
    setTrackingId(trackingId);
  }, [data]);

  const getReferenceNumber = (url) => {
    openMotorInsuranceModal(false);
    setIsLoaderModalOpen(true);
    axios
      .post(`${BASE_API_URL}Payment/card/checkout`, {
        trackingId: trackingId,
        id: uuid(),
      })
      .then(function (response) {
        let statusCode = response?.data?.statusCode;
        //  openMotorInsuranceModal(false);
        setIsLoaderModalOpen(false);
        if (statusCode == "00") {
          toast.success(response?.data?.statusMessage);
          let responseData = response?.data?.responseObject;
          let checkoutReference = responseData?.checkoutReference;
          location.replace(
            `${BASE_API_URL}Payment/card/checkoutform?trackingId=${trackingId}&checkOutReference=${checkoutReference}`
          );
        } else {
          openMotorInsuranceModal(true);
          toast.error(
            response?.data?.statusMessage ||
              "Unable to generate payment reference at the moment"
          );
        }
      })
      .catch(function (error) {
        openMotorInsuranceModal(true);
        setIsLoaderModalOpen(false);
      });
  };

  useEffect(() => {
    if (router?.query) {
      let payStatus = router?.query?.transactionStatus;
      let responseStatus = router?.query?.responseStatus;
      let message = router?.query?.message;
      if (payStatus && responseStatus) {
        if (payStatus == "FAILED") {
          setUnsuccessful(true);
        } else {
          setShowSuccessPage(true);
        }

        setPaymentResponse(router?.query);
      } else {
      }

      let trackingId = getFromStorage("currentTrackingId_equity");
      setCurrentTrackingId(trackingId);
    }
  }, [router?.query]);

  const DownloadReceipt = () => {
    let downloadUrl = `${BASE_API_URL}Payment/receipt?TrackingId=${trackingId}`;
    window.open(downloadUrl, "_blank");
  };
  const goBackWithOneStep = () => {
    let route = "";
    if (trackingId) {
      route = `/onboard-retailer/${trackingId}`;
    } else {
      route = "/";
    }

    // location.replace(route);
    // navigate(-1);

    setCurrentFlowPage("verify_OTP");
    // router.back();
    location.replace(route);
  };

  useEffect(() => {
    let trackingId = getFromStorage("currentTrackingId_equity");
    setCurrentTrackingId(trackingId);
    if (trackingId) {
      handlePendingQuote(trackingId);
      // let userSessionStage = `userCurrentStage__${trackingId}`;
      let userSessionId = `userQuoteDetails_Storage__${trackingId}`;
      let quoteDetails = getFromStorage(userSessionId);
      if (quoteDetails !== null) {
        addData(quoteDetails);
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, []);
  const setCurrentFlowPage = (currentFlow) => {
    let userSessionStage = `userCurrentStage__${trackingId}`;

    // setActiveCoverScreenId(currentFlow);
    currentFlow =
      currentFlow == "verify_OTP" ? "confirm_registration" : currentFlow;
    saveToLocalStorage(userSessionStage, currentFlow);
  };
  const handlePendingQuote = (id) => {
    axios
      .get(`${BASE_API_URL}Quote/pendingquotes/${id}`)
      .then(function (response) {
        let statusCode = response?.data?.statusCode;
        let serverMessage = response?.data?.statusMessage;
        if (statusCode == "00") {
          setPendingQuote(response?.data?.responseObject);
        } else {
          // alert("jij");
          toast.error(
            response?.data?.statusMessage || "Can not get pending quote"
          );

          setTimeout(function () {
            goBackWithOneStep();
          }, 2000);
        }
      })
      .catch(function (error) {});
    // openMotorInsuranceModal(true);
  };
  return showSuccessPage === false ? (
    <>
      <Home>
        <Space direction="vertical">
          {/*  */}
          <div>
            <PageHeader
              title="My pending quotes"
              footer="Would you like to purchase this policy?"
            />
          </div>
          <div>
            <Row gutter={[10, 10]} align="middle">
              <Col lg={9}>
                <Card hoverable onClick={handleQuoteGenerationDetails}>
                  <Row>
                    <Col xl={5}>
                      <div
                        style={{
                          padding: "8px",
                          width: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignSelf: "center",
                          border: "1px solid transparent;",
                          borderRadius: "50%",
                          background: "rgb(146 148 151 / 17%)",
                        }}
                      >
                        <img
                          alt="example"
                          className="w-100"
                          style={{ width: "100%" }}
                          src={"/assets/images/school_universities.svg"}
                        />
                      </div>
                    </Col>
                    <Col>
                      <h3>{pendingQuote?.product}</h3>
                      <div className="faint-text">
                        <div>{pendingQuote?.premiumPackage || "---"}</div>
                        <div>
                          Benefit{" "}
                          {formatAmount(pendingQuote?.totalBenefit || 0)}{" "}
                          {pendingQuote?.currency}
                        </div>
                        <div>
                          Premium:{" "}
                          {formatAmount(pendingQuote?.totalPremium || 0)}{" "}
                          {pendingQuote?.currency}
                        </div>
                        {/* amount */}
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              {/* <Col span={8}>
              <Card hoverable style={{}}>
                <Row  align="middle" >
                  <Col xl={5}>
                  <div style={{padding:'8px',width:'50px',height:'50px',display:'flex',justifyContent:'center',alignSelf:'center'
                  ,border:'1px solid transparent;', borderRadius:'50%',background:'rgb(146 148 151 / 17%)',
                  
                }}>
                  <img
                  alt="example"
                  className="w-100"
                  style={{ width: "100%" }}
                  src={"./assets/images/school_universities.svg"}
                />
                  </div>
                  </Col>
                  <Col>
                    <h3>Education</h3>
                    <div className="faint-text">
                      <div>Gold package</div>
                      <div>Benefit 80,000.00 KES</div>
                      <div>Premium: 1,500.00 KES</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col> */}
            </Row>
          </div>
          <div></div>
        </Space>
      </Home>

      <MotorInsuranceModal title="Buy policy confirmation" footer={false}>
        <MotorInsuranceFlow />
      </MotorInsuranceModal>

      <Modal
        open={isLoaderModalOpen}
        footer={false}
        // onCancel={() => setIsLoaderModalOpen(false)}
        width={400}
        closable={false}
        centered
      >
        <div direction="vertical">
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ marginBottom: "8px" }}>
              <img src={"/assets/images/loader.svg"} alt="" />
            </div>
            <h2>Processing transaction</h2>
            <p className="faint-text">Please wait as we process your payment</p>
          </div>
        </div>
      </Modal>

      <Modal
        open={unsuccessful}
        footer={false}
        onCancel={() => setUnsuccessful(false)}
        width={400}
        closable={true}
        centered
      >
        <div direction="vertical">
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <h2>Payment unsuccessful</h2>
            <p className="faint-text">
              There was an error while processing your payment. Please try
              again.{" "}
            </p>
          </div>
          <Row gutter={[10, 10]} justify="center">
            <Col span={8}>
              <Button
                type="link"
                onClick={() => {
                  setIsModalOpen(false);
                  setUnsuccessful(false);
                }}
                block
              >
                Cancel
              </Button>
            </Col>
            <Col span={20}>
              <Button
                type="primary"
                onClick={() => {
                  setIsModalOpen(true);
                  setUnsuccessful(false);
                }}
                block
              >
                Try again
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  ) : (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <Success
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
        downloadReceipt={DownloadReceipt}
      />
    </div>
  );
}
