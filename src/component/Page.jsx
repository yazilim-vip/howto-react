import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Page = (props) => {
    return (
        <Row>
            <Col md={props.span}>
                <div className="page-content">
                    {props.children}
                </div>
            </Col>
        </Row>
    )
}

Page.defaultProps = {
    span: { span: 8, offset: 2 }
};

export default Page;