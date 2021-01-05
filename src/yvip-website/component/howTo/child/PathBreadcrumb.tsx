import React, { FC } from 'react'

import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export interface PathBreadcrumbProps {
    items: string[]
}

export const PathBreadcrumb: FC<PathBreadcrumbProps> = ({ items }: PathBreadcrumbProps) => {
    const getLink = (index: number) => {
        return '/howto/' + items.slice(0, index).join('/')
    }

    const breadcrumbItems = items.map((item, index) => {
        return (
            <Breadcrumb.Item
                key={item}
                active={index + 1 === items.length}
                linkAs={Link}
                linkProps={{ to: getLink(index + 1), className: 'link' }}
            >
                {item}
            </Breadcrumb.Item>
        )
    })

    return (
        <Breadcrumb>
            <Breadcrumb.Item key="root" linkAs={Link} linkProps={{ to: '/howto', className: 'link' }}>
                <span>
                    <FontAwesomeIcon icon={faHome} />
                </span>
            </Breadcrumb.Item>
            {breadcrumbItems}
        </Breadcrumb>
    )
}
