import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import _ from 'underscore'

export const HowToBreadcrumb = (props) => {
    // values from mapStateToProps
    const { howTo, categoryNames, rootCategorySelectedFlag } = props

    const names = _.extend([], howTo ? howTo.categoryList : categoryNames)
    if (howTo) {
        names.push(howTo.label)
    }

    const getLink = (index) => {
        return '/howto/' + names.slice(0, index).join('/')
    }

    const renderItems = names.map((item, index) => {
        return (
            <Breadcrumb.Item
                key={item}
                active={index + 1 === names.length}
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
        </Breadcrumb>
    )
}
