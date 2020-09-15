import React from "react";
import PropTypes from 'prop-types';


import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import * as constants from '../constants'


const HowToBreadcrumb = (props) => {
    const rootFlag = props.rootFlag;
    const categoryNames = props.categoryNames;

    const getLink = (index) => {
        let link = constants.HOWTO_PATH + "/"

        for (let i = 0; i < index; i++) {
            link += categoryNames[i] + "/"
        }
        return link
    }

    const renderItem = (item, index) => (
        <Breadcrumb.Item
            key={index}
            href={getLink(index + 1)}
            active={index + 1 === categoryNames.length}>
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
                href={"/howto"}
                active={rootFlag}>
                <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            {categoryNames !== undefined ? renderItems : null}
        </Breadcrumb>
    )
}


HowToBreadcrumb.propTypes = {
    categoryNames: PropTypes.array.isRequired,
    rootFlag: PropTypes.bool.isRequired,
};

export default HowToBreadcrumb