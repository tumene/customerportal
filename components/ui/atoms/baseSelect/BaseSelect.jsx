import React from "react";
import { Typography, Select } from "antd";

export default function BaseSelect({
  defaultValue,
  label,
  options,
  onChange,
  errors,
  value,
  ...props
}) {
  const _onChange = (value) => {
    onChange?.({ target: { name: props.name, value } });
  };

  return (
    <div className="base-input select">
      {label ? <span className="base-input__label">{label}</span> : ""}
      <Select
        {...props}
        value={value ? value : undefined}
        className="base-input__select"
        defaultValue={defaultValue}
        onChange={_onChange}
      >
        {options?.map((option, index) => (
          <Select.Option value={option.value} key={index}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      {errors?.map((error, i) => (
        <Typography.Text
          type="danger"
          key={i}
          style={{ display: "inline-block", width: "fit-content" }}
        >
          {error}
        </Typography.Text>
      ))}
    </div>
  );
}
