import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const HowToBreadcrumb = ({
    // values from mapStateToProps
    categoryNames,
    rootCategorySelectedFlag,

    // methods from props
    changePath
}) => {

    const getLink = (index) => {
        let link = ""

        for (let i = 0; i < index; i++) {
            link += categoryNames[i] + "/"
        }

        return link.replace(/\/$/, "")
    }

    const renderItems = categoryNames.map((item, index) => {
        return (
            <Breadcrumb.Item key={index} active={index + 1 === categoryNames.length}>
                <Link to={getLink(index + 1)} replace>
                    {item}
                </Link>
            </Breadcrumb.Item>
        )
    })

    return (
        <Breadcrumb>
            <Breadcrumb.Item active={rootCategorySelectedFlag}>
                <span>
                    <Link to="/howto/" replace key="root">
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                </span>
            </Breadcrumb.Item>

            {renderItems}
        </Breadcrumb>
    )
}
const mapStateToProps = (state) => {
    const howtoReducer = state.howtoReducer

    return {
        categoryNames: howtoReducer.categoryNames,
        rootCategorySelectedFlag: howtoReducer.rootCategorySelectedFlag
    }
}

export default connect(mapStateToProps, null)(HowToBreadcrumb)