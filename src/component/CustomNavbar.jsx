import React from 'react';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => (
    <div style={styles.navbar}>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="pl-5">
            <img
                alt=""
                src="/logo.svg"
                width="250"
                className="d-inline-block align-top"
            />
            <span style={styles.slogan} className="text-white-50 d-block">Do the right, not the easy</span>
        </Navbar.Brand>
            <Row>
                <Col>
                    <Nav className="pl-5 ml-auto">
                        <Link className="text-light nav-link" to={'/'}>Home</Link>
                        <Link className="text-light nav-link" to={'/portfolio'}>Portfolio</Link>
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