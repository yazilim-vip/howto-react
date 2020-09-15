import React from "react";
import PropTypes from 'prop-types';
import HowToMenu from "./HowToMenu";
import { Col, Row, Alert } from "react-bootstrap";

import ReactMarkdown from "react-markdown";

import HowToBreadcrumb from "./HowToBreadcrumb";

var HowToBrowser = (props) => {

    const { howtoRequest, selectedCategory, selectedHowto, onContentClick } = props

    var renderHowtoContentElement = () => {
        console.log("Trying to render NEW howto content")

        console.log("WELL DONE, you select a howto to read", howtoRequest.selectedHowtoName)

        if (selectedHowto === null) {
            return (
                <Alert key={1} variant={"danger"}>
                    {howtoRequest.fullPath} not found on archive.
                </Alert>
            )
        }

        return <ReactMarkdown source={selectedHowto.markdownContent} />
    }

    var renderMainContentElement = () => {

        if (selectedCategory === null) {
            return (<Alert key={1} variant={"danger"}>

                {howtoRequest.fullPath} not found on archive.
            </Alert>
            )
        }

        return (
            <div>
                <HowToMenu
                    folderPath={howtoRequest.folderPath}
                    type="subcategory"
                    items={selectedCategory.subCategoryList}
                />

                <hr />

                <Row>
                    {/*Menus*/}
                    <Col md="3" className="border-right">
                        <HowToMenu
                            folderPath={howtoRequest.folderPath}
                            type="content"
                            items={selectedCategory.howtoList}
                            selectedHowto={selectedHowto}
                            onContentClick={onContentClick}
                        />
                    </Col>

                    {/*Content*/}
                    <Col md="9">
                         {renderHowtoContentElement()}
                    </Col>
                </Row>
            </div>
        )
    }

    return (
        <div>
            <HowToBreadcrumb
                categoryNames={howtoRequest.categoryNames}
                rootFlag={howtoRequest.rootCategorySelectedFlag}
            />
            {renderMainContentElement()}
        </div>
    );

}


HowToBrowser.propTypes = {

    howtoRequest: PropTypes.shape({
        fullPath: PropTypes.string,
        folderPath: PropTypes.string,
        categoryNames: PropTypes.array,
        selectedHowtoName: PropTypes.string,
        rootCategorySelectedFlag: PropTypes.bool
    }),

    // filled by data from service
    selectedCategory: PropTypes.object,
    selectedHowto: PropTypes.object,
    onContentClick: PropTypes.func,
};

export default HowToBrowser 