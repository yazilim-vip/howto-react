import React from "react";
import PropTypes from 'prop-types';


import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const HowToBreadcrumb = (props) => {
    const rootFlag = props.rootFlag;
    const categoryNames = props.categoryNames;
    const renderCategory = props.renderCategory;

    const getLink = (index) => {
        let link = ""

        for (let i = 0; i < index; i++) {
            link += categoryNames[i] + "/"
        }

        return link.replace(/\/$/, "")
    }

    const renderItem = (item, index) => (
        <Breadcrumb.Item
            key={index}
            active={index + 1 === categoryNames.length}
            onClick={() => renderCategory(getLink(index + 1))}>
            {item}
        </Breadcrumb.Item>
    )
    
    const renderItems = categoryNames.map((item, index) => {
        return renderItem(item, index)
    })

    return (
        <Breadcrumb>
            <Breadcrumb.Item
                key="root"
                active={rootFlag}
                onClick={() => renderCategory("")}>
                <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            {categoryNames !== undefined ? renderItems : null}
        </Breadcrumb>
    )
}

HowToBreadcrumb.propTypes = {
    categoryNames: PropTypes.array.isRequired,
    rootFlag: PropTypes.bool.isRequired,
    renderCategory: PropTypes.func.isRequired,
};

export default HowToBreadcrumb