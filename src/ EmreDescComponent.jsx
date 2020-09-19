import { faDownload, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cv from "./component/Cv";


class EmreDescComp extends React.Component {

    constructor(props) {
        super()
        this.state = {
            show: false
        }
        console.log('here')
    }

    closeModal = () => this.setState({ show: false });
    showModal = () => this.setState({ show: true });

    render = () => {
        return (
            <div>

                <span>
                    I am an entrepreneur who wants to learn new technologies and use them to make things easier. My life goal is having my own job and creating a software community that everyone can get benefit from. I have deep interest to Object Oriented Paradigm
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
                    dialogClassName="modal-90w"

                >
                    <Modal.Header closeButton>
                        <FontAwesomeIcon icon={faDownload} />
                    </Modal.Header>
                    <Modal.Body style={{
                        backgroundColor: "#eee"
                    }}>
                        <Cv />
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