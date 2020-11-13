import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Container, ListGroup, Row } from 'react-bootstrap'
import {
    HOWTO_VIEW_MODE_GRID_VIEW,
    HOWTO_VIEW_MODE_LIST_VIEW
} from '../howToConstants'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { FileManagerFileItem, FileManagerFolderItem } from './FileManagerItem'

export const HowToFileManager = (props) => {
    // values from mapStateToProps
    const {
        folderPath,
        isHit,
        categoryList,
        howtoList,
        fileManagerViewMode
    } = props

    const prefix = folderPath + '/'

    const renderCategories = (items) => {
        return Object.keys(items).map((key) => {
            const name = isHit ? items[key].name : items[key].name
            const link = isHit ? items[key].path : prefix + items[key].name
            return (
                <FileManagerFolderItem
                    key={link}
                    fileManagerViewMode={fileManagerViewMode}
                    name={name}
                    link={link}
                />
            )
        })
    }

    const renderHowtos = (items) => {
        return Object.keys(items).map((key) => {
            const name = isHit ? items[key].name : items[key].label
            const link = isHit ? items[key].path : prefix + items[key].label
            return (
                <FileManagerFileItem
                    key={link}
                    fileManagerViewMode={fileManagerViewMode}
                    name={name}
                    link={link}
                />
            )
        })
    }

    const renderByToggle = () => {
        if (fileManagerViewMode === HOWTO_VIEW_MODE_LIST_VIEW) {
            return (
                <ListGroup>
                    {renderCategories(categoryList)}
                    {renderHowtos(howtoList)}
                </ListGroup>
            )
        } else if (fileManagerViewMode === HOWTO_VIEW_MODE_GRID_VIEW) {
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
