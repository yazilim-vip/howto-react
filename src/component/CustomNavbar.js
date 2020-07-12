import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import GridLayout from '../layout/GridLayout';

class CustomNavbar extends Component {


    render() {

        return (
            <div style={styles.navbar}>
                <GridLayout>
                    <Navbar bg="dark" variant="dark">

                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src="/logo.svg"
                                width="170"
                                className="d-inline-block align-top"
                            />{' '}
                            <span style={styles.slogan} className="text-white-50 d-block">
                                Do the right, not the easy
                            </span>
                        </Navbar.Brand>

                        <Nav className="mr-auto">
                            <Nav.Link className="text-light" to={'/'}>
                                Home
                            </Nav.Link>
                            <Nav.Link className="text-light" to={'/another'}>
                                About
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </GridLayout>
            </div>

        );
    }
}

const styles = {
    slogan: {
        fontSize: '15px'
    },

    navbar: {
        backgroundColor: '#343a40'
    }
}

export default CustomNavbar;