import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Page = (props) => {
  return (
    <Col md={props.span} style={{ height: '100%' }}>
      <Row>
        <Col md='12'>{props.children}</Col>
      </Row>
    </Col>
  )
}

Page.defaultProps = {
  span: { span: 8, offset: 2 }
}

export default Page
