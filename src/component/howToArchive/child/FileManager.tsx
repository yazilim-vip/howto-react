import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { ListGroup, Container, Col, Row } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import {
    HOWTO_VIEW_MODE_GRID_VIEW,
    HOWTO_VIEW_MODE_LIST_VIEW,
    FileManagerViewMode
} from '../HowToArchiveConstants'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface FileManagerItemType {
    name: string
    path: string
}

export interface FileManagerProps {
    viewMode: FileManagerViewMode
    categoryList: FileManagerItemType[] | null
    howToList: FileManagerItemType[] | null
}

export const FileManager = ({
    viewMode,
    categoryList,
    howToList
}: FileManagerProps) => {
    const renderItems = (
        items: FileManagerItemType[] | null,
        icon: IconProp,
        color: string
    ) => {
        if (!items) {
            return null
        }
        return Object.keys(items).map((key: any) => {
            const name = items[key].name
            const link = items[key].path
            if (viewMode === HOWTO_VIEW_MODE_LIST_VIEW) {
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
            } else if (viewMode === HOWTO_VIEW_MODE_GRID_VIEW) {
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
            } else {
                return null
            }
        })
    }

    const categoryItems = renderItems(categoryList, faFolder, '#50a4d4')
    const howToItems = renderItems(howToList, faFile, '#494d52')
    return (
        <Container fluid>
            {viewMode === HOWTO_VIEW_MODE_LIST_VIEW && (
                <ListGroup>
                    {categoryItems}
                    {howToItems}
                </ListGroup>
            )}
            {viewMode === HOWTO_VIEW_MODE_GRID_VIEW && (
                <Row>
                    {categoryItems}
                    {howToItems}
                </Row>
            )}
        </Container>
    )
}
