import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  PageHeader,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import Item from "antd/lib/list/Item";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { generateMaxLength, REGEX_PATTERNS } from "../../../constants/errors";
import { arrayToSelectOptions } from "../../../utils/dataTypes";
import { AmountInput } from "../../ui/atoms/amountInput";
import { BaseInput } from "../../ui/atoms/baseInput";
import { BaseSelect } from "../../ui/atoms/baseSelect";

export default function Registration({
  registration,
  handleOnSubmit,
  loading,
  setCountry,
  country,
  setCountryFalse,
  countryTrue,
}) {
  const TestCountryData = [
    {
      label: "Kenya",
      value: "kenya",
      image: "/assets/images/kenya.svg",
    },
    {
      label: "Rwanda",
      value: "Rwanda",
      image: "/assets/images/rwanda.svg",
    },
    {
      label: "South Sudan",
      value: "South Sudan",
      image: "/assets/images/SouthSudan.svg",
    },
    {
      label: "Tanzania",
      value: "Tanzania",
      image: "/assets/images/tanzania.svg",
    },
    {
      label: "Uganda",
      value: "Uganda",
      image: "/assets/images/uganda.svg",
    },
  ];
  const TestCountryNationalityData = [
    {
      label: "Kenyan",
      value: "kenyan",
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
  const SourceOfFundData = [
    {
      label: "Salary",
      value: "Salary",
    },
    {
      label: "Payment",
      value: "Payment",
    },
  ];
  const { handleSubmit, control } = registration;

  const onChange = (e) => {
    setCountry(e.target.value);
    setCountryFalse(false);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Space direction="vertical">
        <PageHeader title="Register" onBack={() => {}} />
        <div style={{ marginBottom: "20px" }}>
          <Row gutter={[10, 20]}>
            <Col span={10}>
              <div style={{ background: "#A32A29", height: "5px" }}></div>
            </Col>
            <Col span={10}>
              <div style={{ background: "#D3D4D5", height: "5px" }}></div>
            </Col>
          </Row>
        </div>
        <div className="" style={{ marginBottom: "20px" }}>
          {/* <PageHeader title="Please enter your details" /> */}
          <h3>Please enter your personal details</h3>
        </div>
        <div>
          <Row gutter={[30, 30]}>
            <Col span={10}>
              <Controller
                name="idNumber"
                control={control}
                rules={{
                  required: "ID is required",
                  maxLength: generateMaxLength(20),
                }}
                render={({
                  field: { value, onChange },
                  formState: { errors },
                }) => {
                  const errorMessage = errors?.idNumber?.message;

                  return (
                    <BaseInput
                      placeholder="Enter your ID number"
                      label={"ID number"}
                      name="idNumber"
                      {...{ value, onChange, errors: [errorMessage] }}
                    />
                  );
                }}
              />
            </Col>

            <Col span={10}>
              <div>
                <Controller
                  name="krapin"
                  control={control}
                  rules={{
                    required: "KRA PIN is required",
                    // pattern: REGEX_PATTERNS.ALPHANUMERIC,
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.krapin?.message;

                    return (
                      <BaseInput
                        placeholder="Enter KRA PIN"
                        label={"KRA PIN"}
                        name="krapin"
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
                  name="address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.address?.message;

                    return (
                      <BaseInput
                        placeholder="Enter your address"
                        label={"Address"}
                        {...{ value, onChange, errors: [errorMessage] }}
                        name="address"
                      />
                    );
                  }}
                />
              </div>
            </Col>
            <Col span={10}>
              <div>
                <Controller
                  name="nationality"
                  control={control}
                  rules={{ required: "Nationality is required" }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.nationality?.message;

                    return (
                      <BaseSelect
                        options={TestCountryData}
                        placeholder="Select a Nationality"
                        label={"Nationality"}
                        {...{ value, onChange, errors: [errorMessage] }}
                        name="nationality"
                      />
                    );
                  }}
                />
              </div>
            </Col>
            <Col span={10}>
              <div>
                <BaseInput
                  placeholder="Select a country"
                  label={"Country of residence"}
                  onClick={(e) => {
                    setCountryFalse(true);
                  }}
                  value={country}
                  name="countryOfResidence"
                />
              </div>
            </Col>
            <Col span={10}>
              <div>
                <div span={24}>
                  <div>
                    <span className="base-input__label">
                      Enter your monthly income
                    </span>
                    <Input.Group compact>
                      <BaseSelect
                        options={[
                          {
                            label: "KES",
                            value: "KES",
                          },
                        ]}
                        value={"KES"}
                      />

                      <Controller
                        name="monthlyIncome"
                        control={control}
                        rules={{ required: "Monthly Income is required" }}
                        render={({
                          field: { value, onChange },
                          formState: { errors },
                        }) => {
                          const errorMessage = errors?.monthlyIncome?.message;
                          const _onChange = (valueObject) => {
                            let UserValue = valueObject.value;
                            registration.setValue("monthlyIncome", UserValue, {
                              shouldValidate: true,
                            });
                          };
                          return (
                            <AmountInput
                              placeholder={"Enter your monthly income"}
                              name="monthlyIncome"
                              {...{
                                value,
                                // onChange,
                                errors: [errorMessage],
                              }}
                              // onChange={_onChange}
                              onValueChange={_onChange}
                            />
                          );
                        }}
                      />
                    </Input.Group>
                  </div>
                  <div style={{ margin: "20px 0" }}></div>
                </div>
              </div>
            </Col>
            {/* <Col span={10}>
              <div>
                <Controller
                  name="monthlyIncome"
                  control={control}
                  rules={{ required: "Monthly Income is required" }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.monthlyIncome?.message;

                    return (
                      <AmountInput
                        label={"Enter your monthly income"}
                        placeholder={"Enter your monthly income"}
                        name="monthlyIncome"
                        {...{ value, onChange, errors: [errorMessage] }}
                      />
                    );
                  }}
                />
              </div>
            </Col> */}
            <Col span={10}>
              <div>
                <Controller
                  name="sourceOfFund"
                  control={control}
                  rules={{
                    required: "Funds is required",
                    pattern: REGEX_PATTERNS.LETTERS,
                  }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.sourceOfFund?.message;

                    return (
                      <BaseInput
                        placeholder="Enter your source of funds"
                        label={"Source of funds"}
                        {...{ value, onChange, errors: [errorMessage] }}
                        name="sourceOfFund"
                      />
                    );
                  }}
                />
              </div>

              {/* <div>
                <Controller
                  name="sourceOfFund"
                  control={control}
                  rules={{ required: "Source of Funds is required" }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.sourceOfFund?.message;

                    return (
                      <BaseSelect
                        options={SourceOfFundData}
                        placeholder="Source of funds"
                        label={"Source of funds"}
                        {...{ value, onChange, errors: [errorMessage] }}
                        name="sourceOfFund"
                      />
                    );
                  }}
                />
              </div> */}
            </Col>
            {/* <Col span={10}>
              <div>
                <Controller
                  name="educationLevel"
                  control={control}
                  rules={{ required: "Education is required" }}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => {
                    const errorMessage = errors?.educationLevel?.message;

                    return (
                      <BaseSelect
                        placeholder="Select your education level"
                        label={"Education level"}
                        {...{ value, onChange, errors: [errorMessage] }}
                        name="educationLevel"
                        options={TestEducationData}
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
      <Modal
        open={countryTrue}
        footer={false}
        onCancel={() => {
          setCountryFalse(false);
        }}
        width={400}
        closable={true}
        centered
        title={"Select a country"}
      >
        <div direction="vertical">
          <Space direction="vertical" size="middle">
            {TestCountryData?.map((action, i) => (
              // <Fragment key={i}>
              <Radio.Group onChange={onChange} value={country}>
                <label style={{ cursor: "pointer", margin: "10px 0" }}>
                  <Space
                    style={{
                      justifyContent: "space-between",
                      margin: "10px 0",
                    }}
                  >
                    <Row align="middle">
                      <Col>
                        <div style={{ marginRight: "10px" }}>
                          <img src={action?.image} style={{ width: "100%" }} />
                        </div>
                      </Col>
                      <Col>
                        <Typography.Text>{action.label}</Typography.Text>
                      </Col>
                    </Row>

                    <Col>
                      <Radio
                        value={action.value}
                        //  checked={country === action.label}
                        // onChange={() => setCountry(action?.value)}
                      />
                    </Col>
                  </Space>
                </label>

                {i !== TestCountryData.length - 1 && (
                  <Divider style={{ Padding: "5px 0", margin: 0 }} />
                )}
                {/* </Fragment> */}
              </Radio.Group>
            ))}
          </Space>
        </div>
      </Modal>
    </form>
  );
}
