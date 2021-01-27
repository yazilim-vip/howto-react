import React, { FC } from 'react'

import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Breadcrumb } from 'react-bootstrap'

import { HOWTO_ITEM_TYPE_CATEGORY } from '../constants'
import { PathBreadcrumbProps } from '../types'

export const PathBreadcrumb: FC<PathBreadcrumbProps> = ({ items, itemSelectEventHandler }: PathBreadcrumbProps) => {
    const getLink = (index: number) => {
        return '/howto/' + items.slice(0, index).join('/')
    }
    return (
        <Breadcrumb>
            <Breadcrumb.Item
                key="root"
                linkProps={{
                    className: 'link'
                }}
                onClick={() => itemSelectEventHandler(HOWTO_ITEM_TYPE_CATEGORY, '/howto')}
            >
                <span>
                    <FontAwesomeIcon icon={faHome} />
                </span>
            </Breadcrumb.Item>
            {items.map((item, index) => {
                return (
                    <Breadcrumb.Item
                        key={item}
                        linkProps={{
                            className: 'link'
                        }}
                        active={index + 1 === items.length}
                        onClick={() => itemSelectEventHandler(HOWTO_ITEM_TYPE_CATEGORY, getLink(index + 1))}
                    >
                        {item}
                    </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}
