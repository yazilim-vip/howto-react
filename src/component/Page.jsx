import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Page = (props) => {
    return (
        <div id="page-content" className="py-4" style={{ height: "100%" }}>
            <Col md={{ span: 12 }} style={{ height: "100%" }}>
                <Row style={{ height: "100%" }}>
                    <Col md={props.span} style={{ height: "100%" }}>
                        <div className="page-content" style={{ height: "100%" }}>
                            {props.children}
                        </div>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

Page.defaultProps = {
    span: { span: 8, offset: 2 }
};

export default Page;