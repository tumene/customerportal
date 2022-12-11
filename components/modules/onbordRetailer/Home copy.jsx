import React, { useState } from "react";
import { Button, Col, PageHeader, Row, Space } from "antd";
import { useRouter } from "next/router";
import AmountInput from "../../ui/atoms/amountInput/AmountInput";
import { BaseInput } from "../../ui/atoms/baseInput";
import { BaseSelect } from "../../ui/atoms/baseSelect";

export default function Home() {
  const router = useRouter();

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

  const [formData, setFormData] = useState({
    id: "",
    krapin: "",
    address: "",
    nationality: "",
    country: "",
    income: "",
    funds: "",
    education: "",
  });

  const handleFormFieldChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const disableSubmit =
    !formData.id ||
    !formData.krapin ||
    !formData.address ||
    !formData.nationality ||
    !formData.country ||
    !formData.funds ||
    !formData.education;

  return (
    <Space direction="vertical">
      <div className="" style={{ marginBottom: "20px" }}>
        <PageHeader title="Please enter your details" />
      </div>
      <div>
        <Row gutter={[30, 30]}>
          <Col span={10}>
            <BaseInput
              placeholder="Enter your ID number"
              label={"ID number"}
              onChange={handleFormFieldChange}
              name="id"
            />
          </Col>
          <Col span={10}>
            <div>
              <BaseInput
                placeholder="Enter agent’s last name"
                label={"KRA PIN"}
                onChange={handleFormFieldChange}
                name="krapin"
              />
            </div>
          </Col>
          <Col span={10}>
            <div>
              <BaseInput
                placeholder="Enter your address"
                label={"Address"}
                onChange={handleFormFieldChange}
                name="address"
              />
            </div>
          </Col>
          <Col span={10}>
            <div>
              <BaseSelect
                placeholder="Select your nationality"
                label={"Nationality"}
                onChange={handleFormFieldChange}
                name="nationality"
                options={TestCountryData}
              />
            </div>
          </Col>
          <Col span={10}>
            <div>
              <BaseSelect
                options={TestCountryData}
                placeholder="Select a country"
                label={"Country of residence"}
                onChange={handleFormFieldChange}
                name="country"
              />
            </div>
          </Col>
          <Col span={10}>
            <div>
              <AmountInput
                label={"Enter your monthly income"}
                placeholder={"Enter your monthly income"}
              />
              {/* <BaseInput placeholder='Enter your monthly income' label={"Monthly income"}
            onChange={handleFormFieldChange}
        name='income'
           /> */}
            </div>
          </Col>
          <Col span={10}>
            <div>
              <BaseInput
                placeholder="Enter your source of funds"
                label={"Source of funds"}
                onChange={handleFormFieldChange}
                name="funds"
              />
            </div>
          </Col>
          <Col span={10}>
            <div>
              <BaseSelect
                placeholder="Select your education level"
                label={"Education level"}
                onChange={handleFormFieldChange}
                name="education"
                options={TestEducationData}
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
                disabled={disableSubmit}
                // onClick={()=>setIsModalOpen(true)}
                onClick={() => router.push("/onboard-retailer/verify")}
                block
              >
                Continue
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Space>
  );
}
