import { Input, Typography } from "antd";
import React from "react";

export default function BaseInput({ label, errors, ...props }) {
  return (
    <div className="base-input">
      {label ? <span className="base-input__label">{label}</span> : ""}
      <Input className="base-input__text-space" {...props} />

      {errors?.map((error, i) => (
        <Typography.Text type="danger" key={i}>
          {error}
        </Typography.Text>
      ))}
    </div>
  );
}
