import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import { Document, Page, pdfjs } from 'react-pdf'

export class Cv extends React.Component {
    constructor(props) {
        super()

        this.state = {
            show: false,
            cvSource: props.cvSource,
            numPages: null,
            currentPage: null,
            modalSize: props.modalSize ? props.modalSize : 'lg',
            htmlMode: React.isValidElement(props.cvSource),
            modalTriggerElement: props.children ? (
                props.children
            ) : (
                <div className='text-center'>
                    <Button variant='primary'>
                        <FontAwesomeIcon icon={faFile} className='mr-3' />
                        Resume
                    </Button>
                </div>
            )
        }
    }

    componentDidMount() {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
    }

    closeModal = () => this.setState({ show: false })
    showModal = () => this.setState({ show: true })

    onDocumentLoadSuccess({ numPages }) {
        this.setState({
            numPages: numPages,
            currentPage: 1
        })
    }

    render = () => {
        let modalBody = ''
        if (this.state.htmlMode) {
            modalBody = this.state.cvSource
        } else {
            modalBody = (
                <Document
                    file={this.state.cvSource}
                    //! eslint gives error
                    // eslint-disable-next-line react/jsx-no-bind
                    onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                >
                    {Array.from(new Array(this.state.numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                    ))}
                </Document>
            )
        }

        return (
            <>
                {React.cloneElement(this.state.modalTriggerElement, {
                    onClick: this.showModal
                })}

                <Modal
                    size={this.state.modalSize}
                    show={this.state.show}
                    onHide={this.closeModal}
                >
                    <Modal.Header closeButton className='modal-header-footer'>
                        {!this.state.htmlMode && (
                            <a
                                href={this.state.cvSource}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </a>
                        )}
                    </Modal.Header>

                    <Modal.Body>{modalBody}</Modal.Body>

                    {/* <Modal.Footer className="pull-left" className="modal-header-footer">
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer> */}
                </Modal>
            </>
        )
    }
}
