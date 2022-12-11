import {
  Button,
  Col,
  DatePicker,
  Input,
  PageHeader,
  Row,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import React from "react";
import { Controller } from "react-hook-form";
import {
  generateMaxLength,
  getYearDiffWithMonth,
  REGEX_PATTERNS,
} from "../../../constants/errors";
import { DATE_FORMAT } from "../../../constants/insuranceResources";
import { countryCodeList } from "../../../constants/storage";
import { arrayToSelectOptions } from "../../../utils/dataTypes";
import { disableFutureDate } from "../../../utils/date";
import { AmountInput } from "../../ui/atoms/amountInput";
import { BaseInput } from "../../ui/atoms/baseInput";
import { BaseSelect } from "../../ui/atoms/baseSelect";

export default function ConfirmRegistration({
  confirmRegistration,
  handleOnSubmit,
  onBack,
  loading,
}) {
  const TestCountryData = [
    {
      label: "Nigeria",
      value: "nigeria",
    },
  ];
  const TestEducationData = [
    {
      label: "BSC",
      value: "bsc",
    },
    {
      label: "NC",
      value: "nc",
    },
  ];
  const { handleSubmit, control } = confirmRegistration;
  return (
    <>
      <PageHeader title="Get quote" onBack={onBack} />

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Space direction="vertical">
          <div className="" style={{ marginBottom: "20px" }}>
            <PageHeader title="Please confirm your details" />
          </div>
          <div>
            <Row gutter={[30, 30]}>
              <Col span={10}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: "First name is required",
                    pattern: REGEX_PATTERNS.LETTERS,
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.firstName?.message;

                    return (
                      <BaseInput
                        placeholder="Enter your First name"
                        label={"First name"}
                        name="firstName"
                        {...{ value, onChange, errors: [errorMessage] }}
                      />
                    );
                  }}
                />
              </Col>

              <Col span={10}>
                <div>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{
                      required: "Last name is required",
                      pattern: REGEX_PATTERNS.LETTERS,
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.lastName?.message;

                      return (
                        <BaseInput
                          placeholder="Enter Last name"
                          label={"Last name"}
                          name="lastName"
                          {...{ value, onChange, errors: [errorMessage] }}
                        />
                      );
                    }}
                  />
                </div>
              </Col>
              <Col span={10}>
                {/* <div>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: "Date of birth is required" }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.dateOfBirth?.message;

                      return (
                        <BaseInput
                          placeholder="Enter your Date of birth"
                          label={"Date of birth"}
                          type="date"
                          {...{ value, onChange, errors: [errorMessage] }}
                          name="dateOfBirth"
                        />
                      );
                    }}
                  />
                </div> */}

                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{
                    required: "Enter your date of birth",
                    validate: {
                      notMoreThan18: (value) =>
                        getYearDiffWithMonth(value) >= 18,
                    },
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage =
                      (errors?.dateOfBirth?.type === "notMoreThan18" &&
                        "maximum is 18 years") ||
                      errors?.date_of_birth?.message;

                    const _onChange = (_, value) => {
                      confirmRegistration.setValue("dateOfBirth", value, {
                        shouldValidate: true,
                      });
                    };

                    return (
                      <Space direction="vertical" size={0}>
                        <span className="base-input__label">Date of Birth</span>

                        <DatePicker
                          onChange={_onChange}
                          format={DATE_FORMAT}
                          className="base-input__date"
                          value={value ? moment(value, DATE_FORMAT) : value}
                          // disabledDate={(currentDate) =>
                          //   disableFutureDate(currentDate, {
                          //     amount: 18,
                          //     label: "years",
                          //   })
                          // }
                          {...{ errors: [errorMessage] }}
                        />

                        <Typography.Text type="danger">
                          {errorMessage}
                        </Typography.Text>
                      </Space>
                    );
                  }}
                />
              </Col>

              <Col span={10}>
                <div>
                  <Controller
                    name="emailAddress"
                    control={control}
                    rules={{
                      required: "Email address is required",
                      pattern: REGEX_PATTERNS.EMAIL,
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.emailAddress?.message;

                      return (
                        <BaseInput
                          placeholder="Enter your Email address"
                          label={"Email address"}
                          {...{ value, onChange, errors: [errorMessage] }}
                          name="emailAddress"
                        />
                      );
                    }}
                  />
                </div>
              </Col>
              <Col span={10}>
                <div>
                  <Controller
                    name="countryCode"
                    control={control}
                    rules={{ required: "countryCode is required" }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.lastName?.message;

                      return (
                        <div span={24}>
                          <div>
                            <span className="base-input__label">
                              Mobile number
                            </span>
                            <Input.Group compact>
                              <Controller
                                name="countryCode"
                                control={control}
                                rules={{
                                  required: "Country Code is required",
                                  pattern: REGEX_PATTERNS.NUMBER,
                                  maxLength: generateMaxLength(),
                                }}
                                render={({
                                  field: { value, onChange },
                                  formState: { errors },
                                }) => {
                                  const errorMessage =
                                    errors?.countryCode?.message;
                                  return (
                                    <BaseSelect
                                      placeholder="Select code"
                                      name="countryCode"
                                      options={arrayToSelectOptions(
                                        countryCodeList
                                      )}
                                      {...{
                                        value,
                                        onChange,
                                        errors: [errorMessage],
                                      }}
                                    />
                                  );
                                }}
                              />

                              <Controller
                                name="mobileNumber"
                                control={control}
                                rules={{
                                  required: " Phone Number is required",
                                  pattern: REGEX_PATTERNS.NUMBER,
                                  maxLength: generateMaxLength(),
                                }}
                                render={({
                                  field: { value, onChange },
                                  formState: { errors },
                                }) => {
                                  const errorMessage =
                                    errors?.mobileNumber?.message;
                                  return (
                                    <BaseInput
                                      value={control}
                                      placeholder="012345678"
                                      name="mobileNumber"
                                      // suffix={<CalendarOutlined />}
                                      {...{
                                        value,
                                        onChange,
                                        errors: [errorMessage],
                                      }}
                                    />
                                  );
                                }}
                              />
                            </Input.Group>
                          </div>
                          <div style={{ margin: "20px 0" }}></div>
                        </div>
                      );
                    }}
                  />
                </div>
              </Col>
              {/* <Col span={10}>
                <div>
                  <Controller
                    name="mobileNumber"
                    control={control}
                    rules={{
                      required: "Mobile number is required",
                      pattern: REGEX_PATTERNS.NUMBER,                      
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.mobileNumber?.message;

                      return (
                        <BaseInput
                          placeholder="Enter your Mobile number"
                          label={"Mobile number"}
                          {...{ value, onChange, errors: [errorMessage] }}
                          name="mobileNumber"
                        />
                      );
                    }}
                  />
                </div>
              </Col> */}
            </Row>
            <div style={{ marginTop: "50px" }}>
              {/* <div style={{marginBottom:'30px'}}><Checkbox >I accept the <span style={{color:COLORS?.theme}}>terms</span> & <span style={{color:COLORS?.theme}}>privacy policy</span></Checkbox></div> */}
              <Row gutter={10}>
                <Col span={4}>
                  <Button
                    value="20px"
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={loading}
                    // onClick={()=>setIsModalOpen(true)}
                    block
                  >
                    {loading ? "Loading..." : "Continue"}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Space>
      </form>
    </>
  );
}
