import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

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
            <Breadcrumb.Item
                key={index}
                active={index + 1 === categoryNames.length}
                onClick={() => changePath(getLink(index + 1))}>
                {item}
            </Breadcrumb.Item>
        )
    })

    return (
            <Breadcrumb>
                <Breadcrumb.Item
                    key="root"
                    active={rootCategorySelectedFlag}
                    onClick={() => changePath("")}>
                    <span>
                        <FontAwesomeIcon icon={faHome} />
                    </span>
                </Breadcrumb.Item>
                {renderItems}
            </Breadcrumb>
    )
}
const mapStateToProps = (state) => {
    return {
        categoryNames: state.categoryNames,
        rootCategorySelectedFlag: state.rootCategorySelectedFlag
    }
}

export default connect(mapStateToProps, null)(HowToBreadcrumb)