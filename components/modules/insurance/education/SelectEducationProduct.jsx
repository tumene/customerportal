import { Button, Col, Divider, Radio, Space, Typography } from "antd";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { groupArrayBy } from "../../../../utils/dataTypes";

export default function SelectEducationProduct() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const router = useRouter();

  const handleSelectProduct = (e) => {
    setSelectedProduct(e.target.value);
  };

  const products = [
    {
      key: "sum-assured",
      label: "Target fund value",
      onSelected: () => router.push(`/insurance/education/${selectedProduct}`),
    },
    {
      key: "premium",
      label: "Target Investment Premium amount",
      onSelected: () => router.push(`/insurance/education/${selectedProduct}`),
    },
  ];

  return (
    <Space size={30} direction="vertical">
      <h3>What would you like to do?</h3>

      <Space direction="vertical" size="middle">
        {products?.map((product, i) => (
          <Fragment key={i}>
            <label style={{ cursor: "pointer" }}>
              <Space style={{ justifyContent: "space-between" }}>
                <Col>
                  <Typography.Text>{product.label}</Typography.Text>
                </Col>
                <Col>
                  <Radio
                    value={product.key}
                    checked={selectedProduct === product.key}
                    onChange={handleSelectProduct}
                  />
                </Col>
              </Space>
            </label>

            {i !== products.length - 1 && <Divider style={{ margin: "0" }} />}
          </Fragment>
        ))}
      </Space>

      <Button
        type="primary"
        disabled={!selectedProduct}
        onClick={
          groupArrayBy(products, "key")?.[selectedProduct]?.[0]?.onSelected
        }
      >
        Continue
      </Button>
    </Space>
  );
}
