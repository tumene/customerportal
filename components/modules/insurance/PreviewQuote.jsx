import {
  CloseOutlined,
  DownloadOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import uuid from "react-uuid";
import { BASE_API_URL } from "../../../constants/api";
import useModal from "../../../hooks/useModal";
import useCancelQuote, { usePreviewQuoteApi } from "../../api/useCancelQuote";
import useSendQuoteEmail from "../../api/useSendQuoteEmail";
import QuoteDoc from "./QuoteDoc";

export default function PreviewQuote({
  showBuyNowButton,
  onPreviewQuoteBack,
  trackingId,
  emailAddress,
}) {
  const onBack = onPreviewQuoteBack;
  const [MailModal, openMailModal, closeMailModal] = useModal();
  const [CancelModal, openCancelModal, closeCancelModal] = useModal();
  const sendEmailApi = useSendQuoteEmail();
  const cancelQuoteApi = useCancelQuote();
  const previewQuoteApi = usePreviewQuoteApi({ trackingId });
  const [sendingEmail, setSendingEmail] = useState(false);
  const [cancellingQuote, setCancellingQuote] = useState(false);
  const router = useRouter();
  const [quoteTemplate, setQuoteTemplate] = useState("");

  const sendEmail = async () => {
    setSendingEmail(true);

    try {
      await sendEmailApi.fetch({ trackingId, id: uuid() });
      openMailModal();
      setSendingEmail(false);
    } catch (error) {
      toast.error("An error occurred please try again later");
    } finally {
      setSendingEmail(false);
    }
  };

  const cancelQuote = async () => {
    closeCancelModal();
    setCancellingQuote(true);

    try {
      await cancelQuoteApi.fetch({ trackingId, id: uuid() });
      toast.error("Cancelled successfully");
      router.push("/");
    } catch (error) {
      toast.error("An error occurred please try again later");
    } finally {
      setCancellingQuote(false);
    }
  };

  const loadPdfPreview = async () => {
    try {
      const response = await previewQuoteApi.fetch();
      setQuoteTemplate(response.data.statusMessage);
    } catch (error) {
      toast.error("An error occurred please try again later");
    }
  };

  useEffect(() => {
    loadPdfPreview();
  }, []);

  const previewQuoteUrl =
    BASE_API_URL + `Quote/quotepdf?TrackingId=${trackingId}`;

  const downloadQuoteUrl =
    BASE_API_URL + `Quote/downloadpdf?TrackingId=${trackingId}`;

  return (
    <>
      <PageHeader title="Get quote" onBack={onBack} />

      <Row gutter={40}>
        <Col span={12}>
          <QuoteDoc template={quoteTemplate} />
        </Col>

        <Col span={12}>
          <Space direction="vertical" size="middle">
            <h4>Actions</h4>

            {showBuyNowButton ? (
              <>
                <Link href={`/onboard-retailer/${trackingId}`}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                  >
                    Buy now
                  </Button>
                </Link>
              </>
            ) : null}

            <Space direction="vertical" size={20}>
              <a href={downloadQuoteUrl}>
                <Button
                  type={showBuyNowButton ? "" : "primary"}
                  size="large"
                  icon={<DownloadOutlined />}
                >
                  Download Quote
                </Button>
              </a>

              <Button
                size="large"
                icon={<MailOutlined />}
                onClick={sendEmail}
                loading={sendingEmail}
              >
                Send to my email address
              </Button>

              <Button
                size="large"
                icon={<CloseOutlined />}
                onClick={openCancelModal}
                loading={cancellingQuote}
              >
                Cancel
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>

      <MailModal
        footer={[
          <Button
            key="dismiss"
            type="link"
            style={{ padding: "0" }}
            onClick={closeMailModal}
          >
            Dismiss
          </Button>,
        ]}
      >
        <Space direction="vertical">
          <h2>You have got mail</h2>
          <p className="faint-text">
            We have sent your statement to{" "}
            {emailAddress || "your email address"}
          </p>
        </Space>
      </MailModal>

      <CancelModal
        footer={[
          <Button key="dismiss" type="link" onClick={closeCancelModal}>
            Never mind
          </Button>,
          <Button key="dismiss" type="primary" onClick={cancelQuote}>
            Yes, Cancel
          </Button>,
        ]}
      >
        <Space direction="vertical">
          <h2>Cancel quote?</h2>
          <p className="faint-text">Are you sure you want to cancel?</p>
        </Space>
      </CancelModal>
    </>
  );
}
