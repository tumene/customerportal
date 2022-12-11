import { Button, DatePicker, Space, Typography } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { BaseSelect } from "../../../ui/atoms/baseSelect";
import { DATE_FORMAT } from "../../../../constants/insuranceResources";
import { disablePastDate } from "../../../../utils/date";

const DURATION_OPTIONS = [
  {
    label: "3 years",
    value: "3",
  },
  {
    label: "4 years",
    value: "4",
  },
  {
    label: "5 years",
    value: "5",
  },
  {
    label: "6 years",
    value: "6",
  },
  {
    label: "7 years",
    value: "7",
  },
  {
    label: "8 years",
    value: "8",
  },
  {
    label: "9 years",
    value: "9",
  },
  {
    label: "10 years",
    value: "10",
  },
  {
    label: "11 years",
    value: "11",
  },
  {
    label: "12 years",
    value: "12",
  },
  {
    label: "13 years",
    value: "13",
  },
  {
    label: "14 years",
    value: "14",
  },
  {
    label: "15 years",
    value: "15",
  },
];

export default function SelectCoverDuration({
  personalDetailsForm,
  formErrors,
  onContinue,
}) {
  const { control, setValue, getValues } = useForm({
    defaultValues: {
      duration: personalDetailsForm?.getValues("duration"),
      start_date: personalDetailsForm?.getValues("start_date"),
    },
  });

  return (
    <Space direction="vertical" size={30}>
      <Typography.Title level={4}>Cover Duration</Typography.Title>

      <Controller
        name="duration"
        control={control}
        rules={{
          required: "Select duration of policy",
        }}
        render={({ field: { value, onChange } }) => {
          const errorMessage = formErrors?.duration?.message;

          const _onChange = (e) => {
            onChange(e);
            personalDetailsForm.setValue("duration", getValues("duration"), {
              shouldValidate: true,
            });
          };

          return (
            <BaseSelect
              label="Period of duration"
              placeholder="Select the duration of policy"
              name="coverDuration"
              options={DURATION_OPTIONS}
              {...{ value, onChange: _onChange, errors: [errorMessage] }}
            />
          );
        }}
      />

      <Controller
        name="start_date"
        control={control}
        render={({ field: { value } }) => {
          const errorMessage = formErrors?.start_date?.message;

          const _onChange = (_, value) => {
            setValue("start_date", value);
            personalDetailsForm.setValue(
              "start_date",
              getValues("start_date"),
              {
                shouldValidate: true,
              }
            );
          };

          return (
            <Space direction="vertical" size={0}>
              <span className="base-input__label">Cover start date</span>
              <DatePicker
                onChange={_onChange}
                value={value ? moment(value, DATE_FORMAT) : value}
                disabledDate={disablePastDate}
                format={DATE_FORMAT}
                className="base-input__date"
              />
              <Typography.Text type="danger">{errorMessage}</Typography.Text>
            </Space>
          );
        }}
      />

      <Space direction="vertical" size={0}>
        <span className="base-input__label">Cover end date</span>
        <DatePicker
          value={
            getValues("duration") && getValues("duration")
              ? moment(getValues("start_date"), DATE_FORMAT)
                  .add(+getValues("duration"), "y")
                  .subtract(1, "days")
              : getValues("duration")
          }
          format={DATE_FORMAT}
          className="base-input__date"
          disabled
        />
      </Space>

      <Button type="primary" size="large" onClick={onContinue}>
        Continue
      </Button>
    </Space>
  );
}
