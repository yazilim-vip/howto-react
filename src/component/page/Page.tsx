import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Col, Row } from 'react-bootstrap'

export const Page = (props: any) => {
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
