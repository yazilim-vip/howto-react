import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class GridLayout extends Component {

    render() {
        return (
            <Col md={{ span: 12 }}>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        {this.props.children}
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default GridLayout;