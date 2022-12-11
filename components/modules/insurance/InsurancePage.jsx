import { FilterTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  PageHeader,
  Radio,
  Row,
  Space,
} from "antd";
import React from "react";
import { COLORS } from "../../../constants/colors";
import useModal from "../../../hooks/useModal";
import GetEducationCoverModal from "./education/GetEducationCoverModal";
import { useRouter } from "next/router";
import GetLastExpenseCoverModal from "./lastExpense/GetLastExpenseCoverModal";

export default function InsurancePage() {
  const router = useRouter();
  const [LastExpenseModal, openLastExpenseModal, closeLastExpense] = useModal();
  const [EducationCoverModal, openEducationCoverModal] = useModal();
  const { id: activeProductFilter } = router.query;

  const INSURANCE_COVERS = [
    {
      title: "Funeral expense cover",
      description:
        "Funeral Expense solution is designed to help families deal with the burden of meeting immediate funeral related expenses on the death of a family member.",
      onGetCover: openLastExpenseModal,
      filterGroup: "last-expense",
    },
    {
      title: "Education cover",
      description:
        "Secure your child’s education and future with our education cover",
      onGetCover: openEducationCoverModal,
      filterGroup: "education",
    },
  ];

  return (
    <>
      <PageHeader title="Get Insurance" onBack={() => router.push("/")} />

      <Row gutter={[30, 30]}>
        <Col span={24}>
          <PageHeader
            title="Apply for insurance"
            footer="We offer affordable funeral expense and education savings with competitive investment returns."
          />
        </Col>

        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Row gutter={[8]}>
                <Col>
                  <FilterTwoTone twoToneColor={COLORS.theme} />
                </Col>
                <Col>Filter by</Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row gutter={[10, 10]} style={{ maxWidth: "700px" }}>
                <Col>
                  <Button
                    value="last-expense"
                    ghost={activeProductFilter === "last-expense"}
                    onClick={() =>
                      router?.push("/insurance/product/last-expense")
                    }
                  >
                    Funeral expense cover
                  </Button>
                </Col>
                <Col>
                  <Button
                    value="education"
                    ghost={activeProductFilter === "education"}
                    onClick={() => router?.push("/insurance/product/education")}
                  >
                    Education cover
                  </Button>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[20, 20]}>
                {INSURANCE_COVERS?.map((cover, i) =>
                  !activeProductFilter ||
                  activeProductFilter === cover?.filterGroup ? (
                    <Col span={8} key={i}>
                      <Card bordered={false}>
                        <Space direction="vertical" size="large">
                          <Card.Meta
                            title={cover?.title}
                            description={cover?.description}
                          />
                          <Row gutter={10}>
                            <Col>
                              <Button
                                type="primary"
                                onClick={cover?.onGetCover}
                              >
                                Get cover
                              </Button>
                            </Col>
                            <Col>
                              <Button type="link" onClick={cover?.onGetCover}>
                                Learn More
                              </Button>
                            </Col>
                          </Row>
                        </Space>
                      </Card>
                    </Col>
                  ) : null
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <LastExpenseModal footer={false}>
        <GetLastExpenseCoverModal {...{ close: closeLastExpense }} />
      </LastExpenseModal>

      <EducationCoverModal footer={false}>
        <GetEducationCoverModal />
      </EducationCoverModal>
    </>
  );
}
