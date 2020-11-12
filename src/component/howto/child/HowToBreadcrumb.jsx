import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const HowToBreadcrumb = (props) => {
    // values from mapStateToProps
    const { categoryNames, rootCategorySelectedFlag } = props

    const getLink = (index) => {
        return '/howto/' + categoryNames.slice(0, index).join('/')
    }

    const renderItems = categoryNames.map((item, index) => {
        return (
            <Breadcrumb.Item
                key={item}
                active={index + 1 === categoryNames.length}
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

export default HowToBreadcrumb
