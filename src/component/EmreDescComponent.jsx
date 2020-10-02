import React from "react";

import { faDownload, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";


import * as Constants from "../constants/constants"



class EmreDescComp extends React.Component {

    constructor() {
        super()
    
        this.state = {
            show: false,
        }
    }

    closeModal = () => this.setState({ show: false });
    showModal = () => this.setState({ show: true });

    render = () => {
        return (
            <div>

                <span>
                    {Constants.EMRE_ABOUT}
                </span>
                <hr />

                <Button variant="warning" onClick={this.showModal}>
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
                        <Link to="/cv/emre">
                            <FontAwesomeIcon icon={faDownload} />
                        </Link>
                    </Modal.Header>
                    <Modal.Body style={{
                        backgroundColor: "#eee"
                    }}>
                        {/* <Cv printable={printable} title="Mehmet Arif Emre Şen" sections={emreCvSections} /> */}
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

export default EmreDescComp