import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Card, Divider, Menu, Space, Typography } from "antd";
import {
  GlobalOutlined,
  HomeOutlined,
  LogoutOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import LightOrDark from "../../icons/LightOrDark";
import { STORAGE_KEYS } from "../../../../constants/storage";
import Link from "next/link";
import { MAP_ROLE_TO_LABEL } from "../../../../constants/insuranceResources";

export default function SideBar() {
  const [contactDetails, setContactDetails] = useState({});
  const [role, setRole] = useState();

  const SIDE_BAR_ITEMS = [
    {
      title: "Home",
      props: {
        icon: <HomeOutlined />,
      },
      key: "home",
      path: "/",
    },
  ];

  const OTHER_MENU_ITEMS = [
    {
      title: "More",
      props: {
        icon: <MoreOutlined />,
      },
      key: "more",
      path: "/",
    },

    {
      title: "Lights on",
      props: {
        icon: <LightOrDark />,
      },
      key: "lights-on",
      path: "/",
    },
    {
      title: "English",
      props: {
        icon: <GlobalOutlined />,
      },
      key: "language",
      path: "/",
    },
    {
      title: "Sign out",
      props: {
        icon: <LogoutOutlined />,
      },
      key: "log-out",
      onClick: () => {
        localStorage.clear();
        window.location.reload();
      },
    },
  ];

  const renderMenuItems = (items = SIDE_BAR_ITEMS) => {
    return items?.map((item) => (
      <Menu.Item key={item.key ? item.key : index} {...item.props}>
        {item.path ? <Link href={item.path}>{item.title}</Link> : null}
        {item.onClick ? (
          <button
            onClick={item.onClick}
            style={{
              background: "transparent",
              border: "0",
              cursor: "pointer",
            }}
          >
            {item.title}
          </button>
        ) : null}
      </Menu.Item>
    ));
  };

  useEffect(() => {
    const storageContactDetails = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.CONTACT) || "{}"
    );

    setRole(localStorage.getItem("ROLE"));

    setContactDetails(storageContactDetails);
  }, []);

  return (
    <Menu mode="inline">
      <Card
        bordered={false}
        size="small"
        style={{
          background: "#F7F7F7",
          margin: "0 10px 30px 10px",
          padding: 0,
          borderRadius: "10px",
        }}
      >
        <Space size={10} align="center">
          <Avatar size={50} style={{ background: "#A32A29" }}>
            {contactDetails?.first_name?.[0] || "P"}
            {contactDetails?.last_name?.[0] || "N"}
          </Avatar>
          <Space direction="vertical" size={0}>
            <Typography.Title level={5}>
              {contactDetails?.first_name || "Profile"}{" "}
              {contactDetails?.last_name || "Name"}
            </Typography.Title>
            <Typography.Text type="secondary">
              {MAP_ROLE_TO_LABEL[role] || ""}
            </Typography.Text>
          </Space>
        </Space>
      </Card>

      {renderMenuItems()}

      <Divider />

      {renderMenuItems(OTHER_MENU_ITEMS)}
    </Menu>
  );
}
