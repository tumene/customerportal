import { CalendarOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  Modal,
  PageHeader,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { generateMaxLength, REGEX_PATTERNS } from "../../../constants/errors";
import { DATE_FORMAT } from "../../../constants/insuranceResources";
import { countryCodeList } from "../../../constants/storage";
import { arrayToSelectOptions } from "../../../utils/dataTypes";
import { AmountInput } from "../../ui/atoms/amountInput";
import { BaseInput } from "../../ui/atoms/baseInput";
import { BaseSelect } from "../../ui/atoms/baseSelect";

export default function Beneficiary({
  confirmRegistration,
  handleOnSubmit,
  onBack,
  onNext,
  loading,
  countryTrue,
  setCountryFalse,
}) {
  const TestCountryData = [
    {
      label: "Minor",
      value: "minor",
    },
    {
      label: "Adult",
      value: "Adult",
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
  const { handleSubmit, control, setValue } = confirmRegistration;

  return (
    <>
      <PageHeader title="Add a Beneficiary" onBack={onBack} />
      <div style={{ marginBottom: "20px" }}>
        <Row gutter={[10, 20]}>
          <Col span={10}>
            <div style={{ background: "#A32A29", height: "5px" }}></div>
          </Col>
          <Col span={10}>
            <div style={{ background: "#A32A29", height: "5px" }}></div>
          </Col>
        </Row>
      </div>
      <div className="" style={{ marginBottom: "20px" }}>
        {/* <PageHeader title="Please enter your details" /> */}
        <h3>Please enter the beneficiary details</h3>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Space direction="vertical">
          {/* <div className="" style={{ marginBottom: "20px" }}>
        <PageHeader title="Please confirm your details" />
      </div> */}
          <div>
            <Row gutter={[30, 30]}>
              <Col span={10}>
                <Controller
                  name="beneficiaryType"
                  control={control}
                  rules={{
                    required: "Beneficiary type is required",
                    // pattern: REGEX_PATTERNS.LETTERS,
                  }}
                  render={({ field: { value }, formState: { errors } }) => {
                    const errorMessage = errors?.beneficiaryType?.message;

                    return (
                      <BaseInput
                        placeholder="Select your Beneficiary type"
                        label="Beneficiary type"
                        onClick={() => setCountryFalse(true)}
                        name="beneficiary"
                        options={TestCountryData}
                        {...{ value, errors: [errorMessage] }}
                      />
                    );
                  }}
                />
              </Col>
              <Col span={10}>
                <div>
                  <Controller
                    name="relationship"
                    control={control}
                    rules={{
                      required: "Relationship is required",
                      pattern: REGEX_PATTERNS.LETTERS,
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.relationship?.message;

                      return (
                        <BaseInput
                          placeholder="Enter relationship with beneficiary"
                          label={"Relationship"}
                          name="relationship"
                          {...{ value, onChange, errors: [errorMessage] }}
                        />
                      );
                    }}
                  />
                </div>
              </Col>

              <Col span={10}>
                <div>
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
                          placeholder="Enter First name"
                          label={"First name"}
                          name="firstName"
                          {...{ value, onChange, errors: [errorMessage] }}
                        />
                      );
                    }}
                  />
                </div>
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
              {/* <Col span={10}>
                <div>
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
                </div>
              </Col> */}
              <Col span={10}>
                <div>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: "Date of birth is required" }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.dateOfBirth?.message;
                      const _onChange = (_, value) => {
                        confirmRegistration.setValue("dateOfBirth", value, {
                          shouldValidate: true,
                        });
                      };
                      return (
                        <Space direction="vertical" size={0}>
                          <span className="base-input__label">
                            Date of Birth
                          </span>

                          <DatePicker
                            onChange={_onChange}
                            format={DATE_FORMAT}
                            className="base-input__date"
                            value={value ? moment(value, DATE_FORMAT) : value}
                            disabledDate={(current) => {
                              let customDate = moment().format("YYYY-MM-DD");
                              return (
                                current &&
                                current > moment(customDate, "YYYY-MM-DD")
                              );
                            }}
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
                </div>
              </Col>
              <Col span={10}>
                <div>
                  <Controller
                    name="id"
                    control={control}
                    rules={{
                      required: "ID Number is required",
                      maxLength: generateMaxLength(),
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage = errors?.id?.message;

                      return (
                        <BaseInput
                          placeholder="Enter ID NUMBER"
                          label={"ID number"}
                          name="id"
                          {...{ value, onChange, errors: [errorMessage] }}
                        />
                      );
                    }}
                  />
                </div>
              </Col>

              <Col span={10}>
                <div>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Last name is required" }}
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
                                  required: "countryCode is required",
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
                                name="phoneNumber"
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
                                    errors?.phoneNumber?.message;
                                  return (
                                    <BaseInput
                                      value={control}
                                      placeholder="012345678"
                                      name="phoneNumber"
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

              <Col span={10}>
                <div>
                  <Controller
                    name="emailAddress"
                    control={control}
                    rules={{
                      // required: "Email address is required",
                      // pattern: REGEX_PATTERNS.EMAIL,
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
                          label={"Email address (optional)"}
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
                    name="benefit"
                    control={control}
                    rules={{
                      required: "Benefit is required",
                      pattern: REGEX_PATTERNS.NUMBER,

                      validate: {
                        notMoreThan100: (value) => parseFloat(value) < 101,
                      },
                    }}
                    render={({
                      field: { value, onChange },
                      formState: { errors },
                    }) => {
                      const errorMessage =
                        (errors?.benefit?.type === "notMoreThan100" &&
                          "Much not be more than 100%") ||
                        errors?.benefit?.message;

                      return (
                        <>
                          <BaseInput
                            placeholder="Enter your Benefit"
                            label={"Benefit (%)"}
                            {...{ value, onChange, errors: [errorMessage] }}
                            name="benefit"
                            disabled={true}
                          />
                          <h5
                            style={{ fontWeight: "400" }}
                            className="faint-text"
                          >
                            Enter percentage of payment beneficiary will get
                          </h5>
                        </>
                      );
                    }}
                  />
                </div>
              </Col>
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
        <Modal
          open={countryTrue}
          footer={false}
          onCancel={() => setCountryFalse(false)}
          width={400}
          closable={true}
          centered
          title={"Beneficiary"}
        >
          <div style={{ marginBottom: "30px" }}>
            <h3>Please select the beneficiary type</h3>
          </div>
          <div direction="vertical">
            <Space direction="vertical" size="middle">
              {TestCountryData?.map((action, i) => (
                <Fragment key={i}>
                  <label style={{ cursor: "pointer" }}>
                    <Space style={{ justifyContent: "space-between" }}>
                      <Row align="middle">
                        <Col>
                          <div style={{ marginRight: "10px" }}>
                            <img
                              src={action?.image}
                              style={{ width: "100%" }}
                            />
                          </div>
                        </Col>
                        <Col>
                          <Typography.Text>{action.label}</Typography.Text>
                        </Col>
                      </Row>

                      <Col>
                        <Radio
                          value={action.key}
                          //  checked={country === action.label}
                          onChange={() => {
                            setValue("beneficiaryType", action?.value);
                            setCountryFalse(false);
                          }}
                        />
                      </Col>
                    </Space>
                  </label>

                  {i !== TestCountryData.length - 1 && (
                    <Divider style={{ margin: "0" }} />
                  )}
                </Fragment>
              ))}
            </Space>
          </div>
        </Modal>
      </form>
    </>
  );
}
