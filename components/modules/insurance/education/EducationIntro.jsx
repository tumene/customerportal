import { Button, Space } from "antd";
import React from "react";
import SvgAdvice from "../../../ui/icons/Advice";

export default function EducationIntro({ onApply }) {
  return (
    <Space direction="vertical">
      <h3 style={{ textAlign: "center" }}>Education Cover</h3>

      <div style={{ textAlign: "center" }}>
        <SvgAdvice />
      </div>

      <div>
        <h4>Your child’s education matters...</h4>
        <p className="faint-text">
          To prepare them for the world tomorrow. The cost of education is
          increasing and saving early helps you to plan better.
        </p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h4>Our Education Savings product</h4>
        <p className="faint-text">
          Will help you invest towards your child’s education:
        </p>
        <ul className="faint-text" style={{ padding: "0 0 0 20px" }}>
          <Space direction="vertical">
            <li>
              You can choose to make your investment contributions as often as
              you prefer
            </li>
            <li>
              You can also change your contribution amount if your financial
              circumstances change.
            </li>
            <li>
              This product has a life cover that guarantees a payout of the
              expected fund value at maturity in case of death.
            </li>
            <li>Has an investment term ranging from 3 years to 15 years</li>
            <li>
              Provides you access to your fund at any time with a minimum
              guaranteed investment return of 4.5% p.a. You can expect to earn
              up to 7% p.a. if you save until the end of the investment term.
            </li>
          </Space>
        </ul>
      </div>

      <Button type="primary" onClick={onApply}>
        Apply now
      </Button>
    </Space>
  );
}
