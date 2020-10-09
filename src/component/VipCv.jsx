/* eslint-disable react/jsx-key */
import * as React from 'react'
import { Col, Row, Container } from 'react-bootstrap'

export const VipCvSectionItem = (props) => {
  const renderItemFields = () => {
    return Object.keys(props.item).map((field) => {
      return (
        <Row>
          <Col lg='3' sm='4'>
            <span className='cv-item-title'>{field}</span>
          </Col>
          <Col lg='9' sm='8'>
            <span className='d-none d-sm-inline mr-2'>:</span>
            {props.item[field]}
          </Col>
        </Row>
      )
    })
  }
  return <div className='cv-item'>{renderItemFields()}</div>
}

export const VipCvSectionItemList = (props) => {
  const renderItems = () => {
    return props.items.map((item) => <VipCvSectionItem item={item} />)
  }
  return <div className='cv-item-list'>{renderItems()}</div>
}

export const VipCvSection = (props) => {
  let elements = null
  if (props.imageSrc) {
    elements = (
      <div className='row'>
        <div className='col-lg-9 col-md-7'>
          <ul className='cv-item-list'>{props.children}</ul>
        </div>
        <div className='col-lg-3 col-md-5 d-none d-md-block d-print-block'>
          <div className='cv-img-wrapper'>
            <img src={props.imageSrc} className='img-fluid' alt='' />
          </div>
        </div>
      </div>
    )
  } else {
    elements = props.children
  }

  return (
    <Col lg='12'>
      <Row>
        <div className='cv-section'>
          <div className='cv-section-title'>{props.title}</div>
          <div className='cv-section-content'>{elements}</div>
        </div>
      </Row>
    </Col>
  )
}
export const VipCv = (props) => {
  let toolbarElement
  if (props.printable) {
    toolbarElement = (
      <div
        className='cv-toolbar d-print-none'
        style={{
          width: '100%'
        }}
      >
        <span style={{ cursor: 'pointer' }} onClick={() => window.print()}>
          {/* <FontAwesomeIcon icon={faDownload} className="mr-2" /> */}
          Download
        </span>
      </div>
    )
  }
  return (
    <div className='cv-wrapper'>
      <Container>
        <Col lg='12'>
          <Row>
            <div className='cv-title'>{props.title}</div>
          </Row>
        </Col>
        {toolbarElement}
        {props.sections.map(
          (each) => {
            let element
            const content = each.content
            if (React.isValidElement(content)) {
              element = content
            } else if (Array.isArray(content)) {
              element = <VipCvSectionItemList items={content} />
            } else {
              element = <VipCvSectionItem item={content} />
            }
            return (
              <>
                <VipCvSection title={each.name} imageSrc={each.imageSrc}>
                  {element}
                </VipCvSection>
                {each.pageBreakAfter ? <div className='page-break' /> : null}
              </>
            )
          }
        )}
        {props.children}
        {toolbarElement}
      </Container>
    </div>
  )
}
