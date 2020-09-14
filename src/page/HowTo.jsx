import React from "react";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import HowToMenu from "../component/HowToMenu";
import Page from "../component/Page";
import * as constants from '../constants';
import howtoPathParser from '../util/HowtoPathParser'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

            // filled by user request
            fullPath: fullPath,
            folderPath: fullPathParts.folderPath,
            categoryNames: fullPathParts.categoryNames,
            selectedCategoryName: fullPathParts.selectedCategoryName,
            selectedHowto: fullPathParts.selectedHowto,
            howtoSelectedFlag: fullPathParts.howtoSelectedFlag,

            // filled by data from service
            subCategoryList: null,
            howtoList: null,
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
        let { selectedCategoryName, selectedHowto, folderPath, howtoSelectedFlag } = this.state

        console.log("url", constants.REST_URL + folderPath, "data", data)

        // howto-service should return error response if content is empty, this check is temporary (QUESTION: Why Temporary??)
        if (Object.keys(data).length === 0) {
            let error = "error"
            this.setState({
                error
            });

            return
        }

        let subCategoryList = data[selectedCategoryName].subCategoryList
        let howtoList = data[selectedCategoryName].howtoList

        this.setState({
            isLoaded: true,
            subCategoryList: subCategoryList,
            howtoList: howtoList
        });

        if (howtoSelectedFlag) {
            this.renderMarkdownContent(data[selectedCategoryName].howtoList[selectedHowto])
        } else {
            this.loadFirstHowtoContent()
        }
    }

    loadFirstHowtoContent() {
        let { howtoList } = this.state
        if (Object.keys(howtoList).length === 0) {
            return;
        };

        let firstHowtoIndex = Object.keys(howtoList)[0]
        let firstHowto = howtoList[firstHowtoIndex]

        this.renderMarkdownContent(firstHowto)
        this.props.history.push(this.state.selectedCategoryName + "/" + firstHowto.label);
    }

    renderMarkdownContent(selectedHowto) {
        this.setState({
            selectedHowto: selectedHowto,
            markdownContent: selectedHowto.markdownContent
        })
    }

    serviceErrorHandler(error) {
        this.setState({
            isLoaded: true,
            error
        });
    }


    getBreadcrumbLink(index) {
        let link = constants.HOWTO_PATH + "/"

        for (let i = 0; i < index; i++) {
            link += this.state.categoryNames[i] + "/"
        }

        // console.log("breadcrumbLink = ", link)

        return link
    }


    render() {
        const { error, isLoaded, subCategoryList, howtoList, categoryNames, folderPath, selectedHowto } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (!isLoaded) {
            return <div>Loading...</div>;
        }

        // console.log("selectedCategoryName", selectedCategoryName)
        // console.log("selectedCategoryName.subCategoryList", selectedCategoryName.subCategoryList)
        // console.log("selectedCategoryName.howtoList", selectedCategoryName.howtoList)

        return (
            <Page span={{ span: 12 }}>
                <Breadcrumb>
                    <Breadcrumb.Item
                        key="root"
                        href={"/howto"}
                        active={1 === categoryNames.length && categoryNames[0] == ""}>
                        <FontAwesomeIcon icon={faHome} />
                    </Breadcrumb.Item>
                    {
                        categoryNames.map((item, index) =>
                            <Breadcrumb.Item
                                key={index}
                                href={this.getBreadcrumbLink(index + 1)}
                                active={index + 1 === categoryNames.length}>
                                {item}
                            </Breadcrumb.Item>
                        )
                    }
                </Breadcrumb>

                <HowToMenu
                    folderPath={folderPath}
                    type="subcategory"
                    items={subCategoryList}
                />

                <hr />

                <Row>
                    {/*Menus*/}
                    <Col md="3" className="border-right">
                        <HowToMenu
                            folderPath={folderPath}
                            type="content"
                            items={howtoList}
                            selectedHowto={selectedHowto}
                            onContentClick={this.renderMarkdownContent}
                        />
                    </Col>

                    {/*Content*/}
                    <Col md="9">
                        <ReactMarkdown source={this.state.markdownContent} />
                    </Col>
                </Row>
            </Page>
        );
    }

}

export default HowTo