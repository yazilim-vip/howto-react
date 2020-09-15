import React from "react";
import PropTypes from 'prop-types';
import HowToMenu from "./HowToMenu";
import { Col, Row, Alert } from "react-bootstrap";

import ReactMarkdown from "react-markdown";

import HowToBreadcrumb from "./HowToBreadcrumb";

var HowToBrowser = (props) => {

    const { howtoRequest, selectedCategory, selectedHowto, onContentClick, onCategoryClick} = props

    var renderHowtoContentElement = () => {

        if (selectedHowto !== null) {
            return <ReactMarkdown source={selectedHowto.markdownContent} />
        }

        if (howtoRequest.howtoSelectedFlag || selectedCategory.howtoList.length > 0) {
            return (
                <Alert key={1} variant={"danger"}>
                    {howtoRequest.fullPath} not found on archive.
                </Alert>
            )
        }

    }

    var renderMainContentElement = () => {

        if (selectedCategory === null) {
            return (
            <Alert key={1} variant={"danger"}>
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
                    selectedCategory={selectedCategory}
                    onCategoryClick={onCategoryClick}
                    rootCategorySelected={howtoRequest.rootCategorySelectedFlag}
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
        howtoSelectedFlag: PropTypes.bool,
        rootCategorySelectedFlag: PropTypes.bool
    }),

    // filled by data from service
    selectedCategory: PropTypes.object,
    selectedHowto: PropTypes.object,
    onContentClick: PropTypes.func,
    onCategoryClick: PropTypes.func
};

export default HowToBrowser 