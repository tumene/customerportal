import { Avatar, Button, Divider, Radio, Space, Typography } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MAP_ROLE_TO_LABEL } from "../../../constants/insuranceResources";
import Banner from "../../ui/icons/Banner";
import WhiteLogo from "../../ui/icons/WhiteLogo";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("RETAIL_CUSTOMER");

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const login = () => {
    if (selectedRole) {
      localStorage.setItem("ROLE", selectedRole);
      window.location.reload();
    } else toast.error("Please select a role");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "#A32A29",
          padding: "30px 60px",
          position: "relative",
        }}
      >
        <WhiteLogo />
        <Space direction="vertical" size={20} style={{ marginTop: "30px" }}>
          <Typography.Title
            level={8}
            style={{ color: "#fff", fontSize: "50px" }}
          >
            Welcome to <br /> Helder online
          </Typography.Title>
          <Typography.Text
            level={10}
            style={{ color: "rgb(255, 255, 255, 0.8)", fontSize: "20px" }}
          >
            We delight our customers
          </Typography.Text>
        </Space>

        <Banner className="login-banner-image" />
      </div>
      <Space
        direction="vertical"
        style={{ maxWidth: "500px", padding: "30px" }}
        size={80}
      >
        <div>
          <Typography.Title level={4}>Hello There</Typography.Title>
          <p className="faint-text">Please select an account option</p>
          <br />
          <label style={{ cursor: "pointer" }}>
            <Space align="center" style={{ justifyContent: "space-between" }}>
              <Space>
                <Avatar size={50} style={{ background: "#A32A29" }}>
                  P
                </Avatar>
                <Typography.Text>
                  {MAP_ROLE_TO_LABEL.RETAIL_CUSTOMER}
                </Typography.Text>
              </Space>

              <Radio
                value={"RETAIL_CUSTOMER"}
                checked={selectedRole === "RETAIL_CUSTOMER"}
                onChange={handleRoleChange}
              />
            </Space>
          </label>

          <Divider />

          <label style={{ cursor: "pointer", opacity: ".5" }}>
            <Space align="center" style={{ justifyContent: "space-between" }}>
              <Space>
                <Avatar size={50} style={{ background: "#A32A29" }}>
                  CS
                </Avatar>
                <Typography.Text>
                  {MAP_ROLE_TO_LABEL.SME_CUSTOMER}
                </Typography.Text>
              </Space>

              <Radio
                value={"SME_CUSTOMER"}
                checked={selectedRole === "SME_CUSTOMER"}
                onChange={handleRoleChange}
                disabled
              />
            </Space>
          </label>
        </div>

        <Button type="primary" size="large" onClick={login}>
          Continue
        </Button>
      </Space>
    </div>
  );
}
