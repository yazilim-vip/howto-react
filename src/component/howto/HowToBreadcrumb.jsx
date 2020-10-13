import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { actionCreators } from "../../redux/actions"

const HowToBreadcrumb = ({ changePath, categoryNames, rootCategorySelectedFlag }) => {

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
                <FontAwesomeIcon icon={faHome} />
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

const mapDispatchToProps = actionCreators

export default connect(mapStateToProps, mapDispatchToProps)(HowToBreadcrumb)