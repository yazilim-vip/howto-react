import React from "react";

import {Col, Row, Alert } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import * as constants from '../constants'

import HowToMenu from "../component/HowToMenu";
import HowToBreadcrumb from "../component/HowToBreadcrumb";


import Page from "../component/Page";
import howtoPathParser from '../util/HowtoPathParser'


class HowTo extends React.Component {
    constructor(props) {
        super(undefined);

        let fullPath = props.match.params[0]
            // trim trailing '/' chracter    
            .replace(/\/$/, "")

        let fullPathParts = howtoPathParser(fullPath)
        console.log("fullPathParts", fullPathParts)

        this.state = {
            error: null,
            isLoaded: false,
            categoryNotFoundFlag: false,
            howtoNotFoundFlag: false,

            // filled by user request
            fullPath: fullPath,
            folderPath: fullPathParts.folderPath,
            categoryNames: fullPathParts.categoryNames,
            selectedHowtoName: fullPathParts.selectedHowtoName,
            howtoSelectedFlag: fullPathParts.howtoSelectedFlag,
            rootCategorySelectedFlag: fullPathParts.rootCategorySelectedFlag,

            // filled by data from service
            selectedCategory: null,
            markdownContent: null
        };

        this.renderMarkdownContent = this.renderMarkdownContent.bind(this)
    }

    componentDidMount() {
        this.fetchHowtoData()
    }

    //------------------------
    // Fetching HowTo Data From Service 
    //------------------------
    fetchHowtoData() {
        // get request to the HowTo Service
        fetch(constants.REST_URL + "?path=" + this.state.folderPath)
            // convert response to json    
            .then(res => res.json())

            // handle response
            .then((res) => this.serviceSuccessHandler(res), (err) => this.serviceErrorHandler(err))
    }

    serviceSuccessHandler(data) {
        let { selectedHowtoName, folderPath, howtoSelectedFlag } = this.state

        console.log("url", constants.REST_URL + folderPath, "data", data)

        // howto-service should return error response if content is empty, this check is temporary (QUESTION: Why Temporary??)
        if (Object.keys(data).length === 0) {
            this.setState({
                isLoaded: true,
                categoryNotFoundFlag: true
            });
            return
        }

        // EMRETODO data coming 
        let selectedCategory = data

        this.setState({
            isLoaded: true,
            selectedCategory: selectedCategory,
            categoryNotFoundFlag: false
        });

        if (howtoSelectedFlag) {
            let howto = selectedCategory.howtoList[selectedHowtoName]
            this.renderMarkdownContent(howto)
        } else {
            this.loadFirstHowtoContent()
        }
    }

    loadFirstHowtoContent() {
        let { selectedCategory, rootCategorySelectedFlag } = this.state

        let howtoList = selectedCategory.howtoList
        if (Object.keys(howtoList).length === 0) {
            // NO HowTo found under selectedCategory
            // So, there is no  first HowTo :)
            return;
        }

        let firstHowtoIndex = Object.keys(howtoList)[0]
        let firstHowto = howtoList[firstHowtoIndex]

        this.renderMarkdownContent(firstHowto)
        console.log("firstHowto", firstHowto)

        let prefix = (rootCategorySelectedFlag) ? "" : (selectedCategory.name + "/")
        this.props.history.push(prefix + firstHowto.label);
    }

    renderMarkdownContent(selectedHowto) {
        if (selectedHowto && (Object.keys(selectedHowto).length !== 0)) {
            this.setState({
                howtoNotFoundFlag: false,
                selectedHowto: selectedHowto,
                markdownContent: selectedHowto.markdownContent
            })
        } else {
            this.setState({
                howtoNotFoundFlag: true
            })
        }
    }

    serviceErrorHandler(error) {
        this.setState({
            isLoaded: true,
            error
        });
    }

    render() {
        const { error, isLoaded, selectedCategory, categoryNames, folderPath, selectedHowto } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (!isLoaded) {
            return <div>Loading...</div>;
        }

        let contentElement
        if (this.state.categoryNotFoundFlag) {
            contentElement = (
                <Alert key={1} variant={"danger"}>
                    {this.state.fullPath} not found on archive.
                </Alert>
            )
        } else {

            let howtoContentElement
            if (this.state.howtoSelectedFlag && this.state.howtoNotFoundFlag) {
                howtoContentElement = (
                    <Alert key={1} variant={"danger"}>
                        {this.state.fullPath} not found on archive.
                    </Alert>
                )
            } else {
                howtoContentElement = <ReactMarkdown source={this.state.markdownContent} />
            }

            contentElement = (
                <div>
                    <HowToMenu
                        folderPath={folderPath}
                        type="subcategory"
                        items={selectedCategory.subCategoryList}
                    />

                    <hr />

                    <Row>
                        {/*Menus*/}
                        <Col md="3" className="border-right">
                            <HowToMenu
                                folderPath={folderPath}
                                type="content"
                                items={selectedCategory.howtoList}
                                selectedHowto={selectedHowto}
                                onContentClick={this.renderMarkdownContent}
                            />
                        </Col>

                        {/*Content*/}
                        <Col md="9">
                            {howtoContentElement}
                        </Col>
                    </Row>
                </div>
            )
        }

        return (
            <Page span={{ span: 12 }}>
                <HowToBreadcrumb 
                    categoryNames={categoryNames}
                    rootFalg = {this.state.rootCategorySelectedFlag}
                />
                {contentElement}
            </Page>
        );
    }

}

export default HowTo