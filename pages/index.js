// import { Button, Input, Select } from "antd";
// import { useEffect } from "react";
// import useGetUser from "../components/api/useGetUser";
// import useSubmitItem from "../components/api/useSubmitItem";
// import { BaseInput } from "../components/ui/atoms/baseInput";
// import { BaseSelect } from "../components/ui/atoms/baseSelect";
// import Logo from "../components/ui/icons/Logo";
import PrivateLayout from "../components/ui/organisms/layout/PrivateLayout";
import HomePage from "../components/modules/homeInsurance/Home";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CompassOutlined } from "@ant-design/icons";
import Login from "../components/modules/login/Login";
// import { useGlobalContext } from "../context/global/provider";

export default function Home() {
  const router = useRouter();

  const [role, setRole] = useState();

  useEffect(() => {
    const role = localStorage.getItem("ROLE");
    setRole(role);
  }, []);

  return (
    <>
      {role ? (
        <PrivateLayout title="Get Insurance" onBack={() => router.push("/")}>
          <HomePage />
        </PrivateLayout>
      ) : (
        <Login />
      )}
    </>
  );
}
