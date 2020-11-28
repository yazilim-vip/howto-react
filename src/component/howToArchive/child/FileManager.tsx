import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolder } from '@fortawesome/free-solid-svg-icons'
import { ListGroup, Container, Col, Row } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import {
    HOWTO_VIEW_MODE_GRID_VIEW,
    HOWTO_VIEW_MODE_LIST_VIEW,
    FileManagerViewMode, HOWTO_ITEM_TYPE
} from '../HowToArchiveConstants'
import { TooltipElement } from '../..'
import { HowToItem } from '../model'

export interface FileManagerItemType {
    name: string
    path: string
}

export interface FileManagerProps {
    viewMode: FileManagerViewMode
    categoryList: Array<HowToItem> | null
    howToList: Array<HowToItem> | null
}

export const FileManager = ({
    viewMode,
    categoryList,
    howToList
}: FileManagerProps) => {
    const renderItems = (items: Array<HowToItem> | null) => {
        if (!items) {
            return null
        }

        return Object.keys(items).map((key: any) => {
            const howToItem = items[key]
            const howToItemType = howToItem.type

            const icon = howToItemType === HOWTO_ITEM_TYPE.CATEGORY ?  faFolder : faFileAlt
            const color = howToItemType === HOWTO_ITEM_TYPE.CATEGORY ?  '#50a4d4' : '#494d52'

            const name = howToItem.name
            const link = howToItem.path
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
                        <TooltipElement
                            placement='bottom-end'
                            tooltipElement={link}
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
                        </TooltipElement>
                    </Col>
                )
            } else {
                return null
            }
        })
    }

    const categoryItems = renderItems(categoryList)
    const howToItems = renderItems(howToList)
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
