import { Button, Card, Col, PageHeader, Row, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";
import React from "react";

const PRODUCTS = [
  {
    title: "Funeral expense cover",
    src: "/assets/images/last-expense-cover.png",
    description:
      "Funeral expense solution is designed to help families deal with the burden of meeting immediate funeral related expenses on the death of a family member.",
    path: "/insurance/product/last-expense",
  },
  {
    title: "Get education cover",
    src: "/assets/images/education-cover.png",
    description:
      "Secure your child’s education and future with our education cover",
    path: "/insurance/product/education",
  },
];

export default function Home({ children }) {
  return (
    <Space direction="vertical" size={40}>
      <Space direction="vertical" size={20} style={{ marginTop: "30px" }}>
        <h3>Insurance products</h3>

        <Row gutter={[30, 30]}>
          <Col span={10}>
            <Link href="#">
              <Card
                hoverable
                style={{ cursor: "pointer" }}
                cover={
                  <img
                    alt="Get Insurance"
                    src="/assets/images/get-insurance.svg"
                    style={{
                      padding: "30px 30px 30px 0",
                      background: "#E9EAEA",
                      height: "200px",
                    }}
                  />
                }
                className="rounded"
              >
                <Meta
                  title="Get insurance"
                  description={
                    <p className="faint-text">
                      Explore our funeral expense and Education insurance
                      options
                    </p>
                  }
                />
              </Card>
            </Link>
          </Col>
        </Row>
      </Space>

      {children}

      <Space direction="vertical" size={30}>
        <PageHeader
          title="Recommended for you"
          footer="We thought this might interest you"
        />

        <Row gutter={[30, 30]}>
          {PRODUCTS?.map((product, i) => (
            <Col span={10} key={i}>
              <Card
                hoverable
                className="rounded"
                cover={
                  <img
                    alt={product?.title}
                    className="w-100"
                    style={{ width: "100%" }}
                    src={product?.src}
                  />
                }
              >
                <Meta
                  title={product?.title}
                  description={
                    <p className="faint-text" style={{ maxWidth: "400px" }}>
                      {product?.description}
                    </p>
                  }
                />
                <div style={{ marginTop: "15px" }}>
                  <Space wrap>
                    <Link href={product?.path}>
                      <Button type="primary">Get cover</Button>
                    </Link>

                    <Link href={product?.path}>
                      <Button type="link">Learn more</Button>
                    </Link>
                  </Space>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </Space>
  );
}
