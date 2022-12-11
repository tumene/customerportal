import { Space, Button } from "antd";
import React from "react";
import SvgAdvice from "../../../ui/icons/Advice";

export default function LastExpenseIntro({ setActiveScreen }) {
  return (
    <Space direction="vertical">
      <h3 style={{ textAlign: "center" }}>Funeral expense Cover</h3>

      <div style={{ textAlign: "center" }}>
        <SvgAdvice />
      </div>

      <div>
        <h4>Life is a journey…</h4>
        <p className="faint-text">
          Death within the family may come with a heavy financial burden when we
          may least expect. There will be immediate funeral related expenses to
          be met to accord the family member a decent send off.
        </p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h4>Our Funeral expense cover</h4>
        <p className="faint-text">
          Will make payment to your beneficiary within 48 hours of a notice of
          death towards your funeral expenses. With a range of covers to choose
          from, you are a click away having peace of mind and stability for your
          loved ones when you are gone.
        </p>
      </div>

      <Button
        type="primary"
        onClick={() => setActiveScreen("required-details")}
      >
        Apply now
      </Button>
    </Space>
  );
}
