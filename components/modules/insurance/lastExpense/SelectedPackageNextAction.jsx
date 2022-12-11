import React, { Fragment } from "react";
import { Col, Radio, Button, Typography, Space, Divider } from "antd";
import { groupArrayBy } from "../../../../utils/dataTypes";

export default function SelectedPackageNextAction({
  nextActions,
  nextAction,
  handleNextActionChange,
  generatingQuote,
}) {
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
