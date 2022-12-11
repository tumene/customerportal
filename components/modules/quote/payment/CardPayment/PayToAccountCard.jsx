import {
  CreditCardOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  PageHeader,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import useModal from "antd/lib/modal/useModal";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { arrayToSelectOptions } from "../../../../../utils/dataTypes";
import { BaseInput } from "../../../../ui/atoms/baseInput";
import { BaseSelect } from "../../../../ui/atoms/baseSelect";
import Iframe from "react-iframe";
import axios from "axios";
import { BASE_API_URL } from "../../../../../constants/api";
export default function PayToAccountCard({ onNext, payMobileForm }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentHtmlContent, setPaymentHtmlContent] = useState(null);

  const handleFormFieldChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getPaymentUrl = () => {
    axios
      .get(`${BASE_API_URL}Payment/card/checkoutform?trackingId=33333333333`)
      .then(function (response) {
        let htmlContent = response?.data;
        setPaymentHtmlContent(htmlContent);
      })
      .catch(function (error) {});
  };
  useEffect(() => {
    getPaymentUrl();
  }, []);

  return (
    <>
      <PageHeader title={"Card details"} onBack={() => router.back()} />
      <Space direction="vertical">
        <div>
          <iframe
            //  url="https://www.youtube.com/"
            // width="100%"

            id=""
            className=""
            // display="block"
            position="relative"
            srcdoc={paymentHtmlContent}
            frameborder="0"
            allowfullscreen
            // style="position:absolute;top:0;left:0;width:100%;height:100%;"
            style={{ position: "relative", width: "100%", height: "100%" }}
          />
        </div>
      </Space>
    </>
  );
}
