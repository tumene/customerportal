import { Layout, PageHeader } from "antd";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import Logo from "../../icons/Logo";
import SideBar from "../../molecules/sideBar/SideBar";

export default function PrivateLayout({ title, onBack, children }) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("ROLE");
    let currentPath = router.pathname;
    let paymentRoute = currentPath.includes("onboard-retailer");
    if (!role && !paymentRoute) {
      router.push("/");
    }
  }, []);

  return (
    <Layout className="private-layout" hasSider>
      <Layout.Sider theme="light">
        <div className="private-layout__side-bar-logo">
          <Logo />
        </div>
        <SideBar />
      </Layout.Sider>

      <Layout>
        <Layout.Content className="private-layout__main-content">
          {title ? <PageHeader {...{ title, onBack }} /> : ""}
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
