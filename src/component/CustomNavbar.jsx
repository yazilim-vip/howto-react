import React, { Component } from 'react';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import GridLayout from '../layout/GridLayout';
import { Link } from 'react-router-dom';

const CustomNavbar = () => (


    <div style={styles.navbar}>
        <Navbar bg="dark" variant="dark" className="justify-content-center">
            <Row className="align-items-center">
                <Col md={{ span: 12 }}>
                    <Navbar.Brand className="mr-0">
                        <img
                            alt=""
                            src="/logo.svg"
                            width="170"
                            className="d-inline-block align-top"
                        />{' '}
                        <span style={styles.slogan} className="text-white-50 d-block">Do the right, not the easy</span>
                    </Navbar.Brand>
                    <Nav className="justify-content-center">
                        <Link className="text-light nav-link" to={'/'}>Home</Link>
                        <Link className="text-light nav-link" to={'/about'}>About</Link>
                    </Nav>
                </Col>
            </Row>
        </Navbar>
    </div>

)

const styles = {
    slogan: {
        fontSize: '15px'
    },

    navbar: {
        backgroundColor: '#343a40',
        textAlign: 'center'
    }
}

export default CustomNavbar;