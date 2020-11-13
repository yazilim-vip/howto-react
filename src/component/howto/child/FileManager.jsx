import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Container, ListGroup, Row } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { FileManagerFileItem, FileManagerFolderItem } from './FileManagerItem'

const HowToFileManager = (props) => {
    // values from mapStateToProps
    const { folderPath, isHit, categoryList, howtoList, isToggleOn } = props

    const prefix = folderPath + '/'

    const renderCategories = (items) =>
        Object.keys(items).map((key) => {
            const name = isHit ? items[key].name : items[key].name
            const link = isHit ? items[key].path : prefix + items[key].name
            return (
                <FileManagerFolderItem
                    key={link}
                    viewModeFlag={isToggleOn}
                    name={name}
                    link={link}
                />
            )
        })

    const renderHowtos = (items) => {
        Object.keys(items).map((key) => {
            const name = isHit ? items[key].name : items[key].label
            const link = isHit ? items[key].path : prefix + items[key].label
            return (
                <FileManagerFileItem
                    key={link}
                    viewModeFlag={isToggleOn}
                    name={name}
                    link={link}
                />
            )
        })
    }

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

export default HowToFileManager
