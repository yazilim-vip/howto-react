import React from "react";

import { faDownload, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Document } from 'react-pdf'
class Cv extends React.Component {

    constructor(props) {
        super()

        this.state = {
            show: false,
            cvSource: props.cvSource
        }
    }

    closeModal = () => this.setState({ show: false });
    showModal = () => this.setState({ show: true });

    render = () => {
        return (
            <div className="text-center">
                <hr />
                <Button variant="primary" onClick={this.showModal}>
                    <FontAwesomeIcon icon={faFile} className="mr-3" />
                Resume
            </Button>

                <Modal
                    size="xl"
                    show={this.state.show} on
                    onHide={this.closeModal}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Link to={this.state.cvSource}>
                            <FontAwesomeIcon icon={faDownload} />
                        </Link>
                    </Modal.Header>

                    <Modal.Body>
                        <Document file={this.state.cvSource} />
                    </Modal.Body>

                    <Modal.Footer className="pull-left">
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Cv