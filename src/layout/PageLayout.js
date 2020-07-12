import React, { Component } from 'react';
import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';

class PageLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mt-4">
                <GridLayout>
                    {this.props.children}
                </GridLayout>
            </div>
        );
    }
}

export default PageLayout;