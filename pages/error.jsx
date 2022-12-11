import { Col, Row } from 'antd'
import React from 'react'
import Failed from '../components/modules/quote/payment/Failed'

export default function error() {
  return (
    <Row justify='center'>
        <Col span={20}><Failed/></Col>
    </Row>
  )
}
