import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';


const PageFooterComponent = () => (
    <footer style={styles.stickyFooter}>
        <Navbar bg="dark" sticky="bottom">
            <Navbar.Brand href="#home">
                hehehe
            </Navbar.Brand>
        </Navbar>
    </footer>
)

const styles = {
    stickyFooter: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    }
}

export default PageFooterComponent;