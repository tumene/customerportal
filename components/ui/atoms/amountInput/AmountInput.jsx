import React from "react";
import { Input, Typography } from "antd";
import CurrencyFormat from "react-currency-format";

export default function AmountInput({
  label,
  placeholder,
  Currency,
  value,
  name,
  onchange,
  errors,
  ...props
}) {
  return (
    <div
      className="base-input--currency-format w-100"
      style={{ width: "100%" }}
    >
      <div className="labelContainer">{label && <label>{label}</label>}</div>
      <CurrencyFormat
        className="w-100"
        placeholder={placeholder}
        thousandSeparator={true}
        prefix={Currency}
        value={value}
        name={name}
        {...props}
      />
      {errors?.map((error, i) => (
        <Typography.Text type="danger" key={i}>
          {error}
        </Typography.Text>
      ))}
    </div>
  );
}
