import React, { FC } from 'react'

import { faFileAlt, faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListGroup, Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { HowTo } from 'yvip-website/component'
import { TooltipElement } from 'yvip-website/component/TooltipElement'

export interface FileManagerItemType extends HowTo.types.HowToComponentProps {
    name: string
    path: string
}

export interface FileManagerProps extends HowTo.types.HowToComponentProps {
    viewMode: HowTo.types.FileManagerViewMode
    categoryList: Array<HowTo.models.HowToItem> | null
    howToList: Array<HowTo.models.HowToItem> | null
}

export const FileManager: FC<FileManagerProps> = ({ viewMode, categoryList, howToList }: FileManagerProps) => {
    const renderItems = (items: Array<HowTo.models.HowToItem> | null) => {
        if (!items) {
            return null
        }

        return Object.keys(items).map((key: any) => {
            const howToItem = items[key]
            const howToItemType = howToItem.type

            const icon = howToItemType === HowTo.constants.HOWTO_ITEM_TYPE_CATEGORY ? faFolder : faFileAlt
            const color = howToItemType === HowTo.constants.HOWTO_ITEM_TYPE_CATEGORY ? '#50a4d4' : '#494d52'

            const name = howToItem.name
            const link = howToItem.path
            if (viewMode === HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW) {
                return (
                    <Link to={link} className="link" key={link}>
                        <ListGroup.Item>
                            <FontAwesomeIcon icon={icon} className="mr-3" color={color} />
                            {name}
                        </ListGroup.Item>
                    </Link>
                )
            } else if (viewMode === HowTo.constants.HOWTO_VIEW_MODE_GRID_VIEW) {
                return (
                    <Col xs={4} sm={3} md={3} lg={2} className="py-4 text-center" key={link}>
                        <TooltipElement placement="bottom-end" tooltipElement={link}>
                            <Link to={link} className="link">
                                <FontAwesomeIcon icon={icon} className="pb-1" size="4x" color={color} />
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
            {viewMode === HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW && (
                <ListGroup>
                    {categoryItems}
                    {howToItems}
                </ListGroup>
            )}
            {viewMode === HowTo.constants.HOWTO_VIEW_MODE_GRID_VIEW && (
                <Row>
                    {categoryItems}
                    {howToItems}
                </Row>
            )}
        </Container>
    )
}

FileManager.defaultProps = {
    events: undefined
}
