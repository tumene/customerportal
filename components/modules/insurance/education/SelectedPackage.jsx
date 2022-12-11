import { Button, Col, Divider, Radio, Space, Typography } from "antd";
import React, { Fragment, useState } from "react";
import { groupArrayBy } from "../../../../utils/dataTypes";

export default function SelectedPackage({
  goToContactDetailsForm,
  generatingQuote,
}) {
  const [nextAction, setNextAction] = useState();

  const handleNextActionChange = (e) => {
    setNextAction(e.target.value);
  };

  const nextActions = [
    {
      key: "generate-quote",
      label: "Generate Quote",
      action: () => {
        goToContactDetailsForm("generate-quote");
      },
    },
    {
      key: "request-callback",
      label: "Request a call back",
      action: () => {
        goToContactDetailsForm("request-callback");
      },
    },
  ];

  return (
    <Space size={30} direction="vertical">
      <h3>What would you like to do?</h3>

      <Space direction="vertical" size="middle">
        {nextActions?.map((action, i) => (
          <Fragment key={i}>
            <label style={{ cursor: "pointer" }}>
              <Space style={{ justifyContent: "space-between" }}>
                <Col>
                  <Typography.Text>{action.label}</Typography.Text>
                </Col>
                <Col>
                  <Radio
                    value={action.key}
                    checked={nextAction === action.key}
                    onChange={handleNextActionChange}
                  />
                </Col>
              </Space>
            </label>

            {i !== nextActions.length - 1 && (
              <Divider style={{ margin: "0" }} />
            )}
          </Fragment>
        ))}
      </Space>

      <Button
        type="primary"
        disabled={!nextAction}
        onClick={groupArrayBy(nextActions, "key")?.[nextAction]?.[0]?.action}
        loading={generatingQuote}
      >
        Continue
      </Button>
    </Space>
  );
}
