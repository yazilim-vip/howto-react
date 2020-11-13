import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export const HowToBreadcrumb = (props) => {
    // values from mapStateToProps
    const { howTo, categoryNames, rootCategorySelectedFlag } = props

    const catNames = howTo ? howTo.categoryList : categoryNames

    const getLink = (index) => {
        return '/howto/' + catNames.slice(0, index).join('/')
    }

    const renderItems = catNames.map((item, index) => {
        return (
            <Breadcrumb.Item
                key={item}
                linkAs={Link}
                linkProps={{ to: getLink(index + 1), className: 'link' }}
            >
                {item}
            </Breadcrumb.Item>
        )
    })

    return (
        <Breadcrumb>
            <Breadcrumb.Item
                key='root'
                active={rootCategorySelectedFlag}
                linkAs={Link}
                linkProps={{ to: '/howto', className: 'link' }}
            >
                <span>
                    <FontAwesomeIcon icon={faHome} />
                </span>
            </Breadcrumb.Item>

            {renderItems}

            {howTo && (
                <Breadcrumb.Item active key={howTo.label}>
                    {howTo.label}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}
