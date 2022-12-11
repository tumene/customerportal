import { CalendarOutlined } from "@ant-design/icons";
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
import Image from "next/image";
const { Text } = Typography;
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BASE_API_URL } from "../../../../../constants/api";
import { REGEX_PATTERNS } from "../../../../../constants/errors";
import { useGlobalContext } from "../../../../../context/global/provider";

import {
  arrayToSelectOptions,
  formatAmount,
} from "../../../../../utils/dataTypes";
import { BaseInput } from "../../../../ui/atoms/baseInput";
import { BaseSelect } from "../../../../ui/atoms/baseSelect";

export default function PayToAccountCard({ onNext, onBack }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaderModalOpen, setIsLoaderModalOpen] = useState(false);
  const [unsuccessful, setUnsuccessful] = useState(false);
  const [trackingId, setTrackingId] = useState(null);
  const [mpesaResponseObject, setMpesaResponseObject] = useState({});

  const {
    state1: { data },
  } = useGlobalContext();

  const payToAccountForm = useForm({
    defaultValues: {
      countryCode: "254",
      phoneNumber: "",
    },
  });
  const { handleSubmit, control } = payToAccountForm;

  const handleFormFieldChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlesubmit = (e) => {
    setIsLoaderModalOpen(true);
    const { countryCode, phoneNumber } = e;
    let mobile = `${countryCode}${phoneNumber}`;
    mobile = mobile.replace("+", "");
    axios
      .post(`${BASE_API_URL}Payment/mpesapayment`, {
        phoneNumber: mobile,
        trackingId: trackingId,
      })
      .then(function (response) {
        //  toast.success(response?.data?.statusMessage)

        let statusCode = response?.data?.statusCode;
        setIsLoaderModalOpen(false);
        if (statusCode == "00") {
          let responseData = response?.data?.responseObject;
          toast.success(response?.data?.statusMessage);
          setMpesaResponseObject(responseData);

          setIsModalOpen(true);
        } else {
          setUnsuccessful(true);
          toast.error("An error occurred please try again later");
        }
      })
      .catch(function (error) {
        setIsLoaderModalOpen(false);
        // toast.error(Object.values(error?.response?.data?.errors)[0][0]);
        toast.error("An error occurred please try again later");
      });
  };

  const handleConfirm = () => {
    axios
      .post(`${BASE_API_URL}Payment/mpesa/confirm`, {
        trackingId: trackingId,
        reference: mpesaResponseObject?.reference,
      })
      .then(function (response) {
        let responseMessage = response?.data?.statusMessage;
        let statusCode = response?.data?.statusCode;
        let additionalParameters =
          response?.data?.responseObject?.additionalParameters;

        if (statusCode == "00") {
          toast.success(responseMessage);

          onNext();
        } else {
          let ErrorMessage =
            additionalParameters?.statusDescription ||
            response?.data?.statusMessage;
          toast.error(
            ErrorMessage ||
              "Unable to verify your payment at the moment , please try again"
          );
          setIsModalOpen(false);
          setUnsuccessful(true);
        }
      })
      .catch(function (error) {
        setIsModalOpen(false);
        setUnsuccessful(true);

        let responseMessage = "An error occurred please try again later";
        toast.error(responseMessage);
      });
  };
  useEffect(() => {
    let trackingId = data?.trackingId;
    setTrackingId(trackingId);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(handlesubmit)}>
      <PageHeader title={"Mobile money"} onBack={() => onBack()} />

      <Space direction="vertical">
        <Row gutter={[30, 30]}>
          <Col span={24}>
            <PageHeader title="Please enter your mobile number" />
          </Col>

          <Col span={18}>
            <Row gutter={55}>
              <Col span={10}>
                <Space direction="vertical">
                  <div>
                    <span className="base-input__label">Mobile number</span>
                    <Input.Group compact>
                      <BaseSelect
                        placeholder="+254"
                        name="phone"
                        options={arrayToSelectOptions(["+254"])}
                      />

                      <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                          required: " Phone Number is required",
                          pattern: REGEX_PATTERNS.NUMBER,
                        }}
                        render={({
                          field: { value, onChange },
                          formState: { errors },
                        }) => {
                          const errorMessage = errors?.phoneNumber?.message;
                          return (
                            <BaseInput
                              value={control}
                              placeholder="012345678"
                              name="phoneNumber"
                              suffix={<CalendarOutlined />}
                              {...{ value, onChange, errors: [errorMessage] }}
                            />
                          );
                        }}
                      />
                    </Input.Group>
                  </div>
                  <div style={{ margin: "20px 0" }}></div>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>

      <div style={{ marginTop: "30px" }}>
        <Button
          type="primary"
          size="large"
          htmlType="submit"

          // disabled={disableSubmit}
        >
          Make payment
        </Button>
      </div>

      <Modal
        title="Payment confirmations"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <div direction="vertical">
          <div>
            <div>
              <h3 style={{ textAlign: "center" }}>
                To continue, please confirm your transaction
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
                      Transaction
                    </Text>
                    <h3>Mobile money</h3>
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
                      Charges
                    </Text>
                    <h3>
                      {formatAmount(data?.charges || 0)} {data?.currency}
                    </h3>
                  </Col>
                  <Col span={12}>
                    <Text className="faint-text" strong={false}>
                      From
                    </Text>
                    <h3>Mobile money</h3>
                    <Text className="faint-text" strong={false}>
                      {"----"}
                    </Text>
                  </Col>

                  <Col span={12}>
                    <Text className="faint-text" strong={false}>
                      To
                    </Text>
                    <h3>{data?.receiverName}</h3>
                    <Text className="faint-text" strong={false}>
                      {data?.account}
                    </Text>
                  </Col>
                </Row>
              </PageHeader>
            </div>
            <Row gutter={[10, 10]}>
              <Col span={8}>
                <Button type="primary" onClick={handleConfirm} block>
                  Confirm
                </Button>
              </Col>
              <Col span={8}>
                <Button type="link" onClick={() => setIsModalOpen(false)} block>
                  Cancel
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>

      {/* Loader */}
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
    </form>
  );
}
