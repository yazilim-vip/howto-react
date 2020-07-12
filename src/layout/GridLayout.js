import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

const GridLayout = (props) => (
    <Col md={{ span: 12 }}>
        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                {props.children}
            </Col>
        </Row>
    </Col>
)

export default GridLayout;