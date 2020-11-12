import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import _ from 'underscore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-regular-svg-icons'

const HowToFileManager = ({
    // values from mapStateToProps
    folderPath,
    isHit,
    categoryList,
    howtoList,
    isToggleOn
}) => {
    const prefix = folderPath + '/'
    const renderItem = (name, link, icon, color) => {
        if (isToggleOn) {
            return (
                <Link to={link} className='link' key={link}>
                    <ListGroup.Item>
                        <FontAwesomeIcon
                            icon={icon}
                            className='mr-3'
                            color={color}
                        />
                        {name}
                    </ListGroup.Item>
                </Link>
            )
        } else {
            return (
                <Col
                    xs={4}
                    sm={3}
                    md={3}
                    lg={2}
                    className='py-4 text-center'
                    key={link}
                >
                    <Link to={link} className='link'>
                        <FontAwesomeIcon
                            icon={icon}
                            className='pb-1'
                            size='4x'
                            color={color}
                        />
                        <br />
                        {name}
                    </Link>
                </Col>
            )
        }
    }

    const renderCategories = (items) =>
        Object.keys(items).map((key) => {
            const name = isHit ? items[key].name : items[key].name
            const link = isHit ? items[key].path : prefix + items[key].name

            return renderItem(name, link, faFolder, '#50a4d4')
        })

    const renderHowtos = (items) =>
        Object.keys(items).map((key) => {
            const name = isHit ? items[key].name : items[key].label
            const link = isHit ? items[key].path : prefix + items[key].label

            return renderItem(name, link, faFile, '#494d52')
        })

    const renderByToggle = () => {
        if (isToggleOn) {
            return (
                <ListGroup>
                    {renderCategories(categoryList)}
                    {renderHowtos(howtoList)}
                </ListGroup>
            )
        } else {
            return (
                <Row>
                    {renderCategories(categoryList)}
                    {renderHowtos(howtoList)}
                </Row>
            )
        }
    }

    return <Container fluid>{renderByToggle()}</Container>
}

const mapStateToProps = (state) => {
    const howtoReducer = state.howtoReducer
    const categoryHits = howtoReducer.categoryHits
    const howtoHits = howtoReducer.howtoHits
    const selectedCategory = howtoReducer.selectedCategory

    const categoryList = categoryHits
        ? _.extend({}, categoryHits)
        : selectedCategory.subCategoryList
    const howtoList = howtoHits
        ? _.extend({}, howtoHits)
        : selectedCategory.howtoList

    return {
        folderPath: howtoReducer.folderPath,
        isHit: howtoReducer.categoryHits || howtoReducer.howtoHits,
        categoryList: categoryList,
        howtoList: howtoList,
        isToggleOn: howtoReducer.isToggleOn
    }
}

export default connect(mapStateToProps, null)(HowToFileManager)
