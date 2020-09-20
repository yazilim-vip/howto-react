
import { faDownload, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const CvSectionItem = (props) => {
    const renderItemFields = () => {
        return Object.keys(props.item).map(
            field => (
                <Row>
                    <Col lg="3" sm="4">
                        <span className="cv-item-title">
                            {field}
                        </span>
                    </Col>
                    <Col lg="9" sm="8">
                        <span className="d-none d-sm-inline mr-2">:</span>
                        {props.item[field]}
                    </Col>
                </Row>
            )
        )
    }
    return (
        <div className="cv-item">
            {renderItemFields()}
        </div>
    )
}

const CvSectionItemList = (props) => {
    const renderItems = () => {
        return props.items.map(item => <CvSectionItem item={item} />)
    }
    return (
        <div className="cv-item-list">
            {renderItems()}
        </div>
    )
}

const CvSection = (props) => {

    let elements = null
    if (props.imgSection) {
        elements = (
            <div class="row">
                <div class="col-lg-9 col-md-7">
                    <ul class="cv-item-list">
                        {props.children}
                    </ul>
                </div>
                <div class="col-lg-3 col-md-5 d-none d-md-block d-print-block">
                    <div class="cv-img-wrapper">
                        <img src="/img/emre_formal.jpeg" class="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        )
    } else {
        elements = props.children
    }


    return (
        <Col lg="12">
            <Row>
                <div className="cv-section">
                    <div className="cv-section-title">
                        {props.title}
                    </div>
                    <div className="cv-section-content">
                        {elements}
                    </div>
                </div>
            </Row>
        </Col>
    )
}
const Cv = (props) => {

    let toolbarElement
    if (props.printable) {
        toolbarElement = (
            <div className="cv-toolbar d-print-none" style={{
                width: "100%"
            }}>
                <span style={{ cursor: "pointer" }} onClick={() => window.print()}>
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Download
                </span>
            </div>
        )
    }
    return (
        <div className="cv-wrapper">
            <div className="container">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="cv-title">
                            {props.title}
                        </div>
                    </div>
                </div>
                {toolbarElement}
                {
                    props.sections.map(each => {
                        let element
                        let content = each.content
                        if (React.isValidElement(content)) {
                            element = content
                        } else if (Array.isArray(content)) {
                            element = <CvSectionItemList items={content} />
                        } else {
                            element = <CvSectionItem item={content} />
                        }

                        return (
                            <>
                                <CvSection title={each.name} imgSection={each.imgSection}>
                                    {element}
                                </CvSection>
                                {each.pageBreakAfter ? (<div className="page-break"></div>) : null}
                            </>
                        )
                    })
                }
                {props.children}
                {toolbarElement}
            </div>
        </div>

    )
}

export default Cv
export { CvSection, CvSectionItemList, CvSectionItem }