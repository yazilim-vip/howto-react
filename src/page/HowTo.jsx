import React from "react";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import HowToMenu from "../component/HowToMenu";
import Page from "../component/Page";
import * as constants from '../constants';
import howtoPathParser from '../util/HowtoPathParser'

class HowTo extends React.Component {
    constructor(props) {
        super(undefined);

        let fullPath = props.match.params[0]
            // trim trailing '/' chracter    
            .replace(/\/$/, "")

        // let userRequest = this.parseFullPath(fullPath)
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

            // filled by data from service
            subCategoryList: null,
            howtoList: null,
            markdownContent: null
        };

        this.renderMarkdownContent = this.renderMarkdownContent.bind(this)
    }


    componentDidMount() {
        let { selectedCategoryName, selectedHowto, folderPath } = this.state

        fetch(constants.REST_URL + "?path=" + folderPath)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("url", constants.REST_URL + folderPath)
                    console.log("result", result)

                    // howto-service should return error response if content is empty, this check is temporary
                    if (Object.keys(result).length === 0) {
                        let error = "error"
                        this.setState({
                            error
                        });

                        return
                    }

                    let subCategoryList = result[selectedCategoryName].subCategoryList
                    let howtoList = result[selectedCategoryName].howtoList

                    this.setState({
                        isLoaded: true,
                        subCategoryList: subCategoryList,
                        howtoList: howtoList
                    });

                    if (selectedHowto !== null) {
                        this.renderMarkdownContent(result[selectedCategoryName].howtoList[selectedHowto])
                    } else if (Object.keys(howtoList).length !== 0) {
                        let firstHowtoIndex = Object.keys(howtoList)[0]
                        let firstHowto = howtoList[firstHowtoIndex]

                        this.renderMarkdownContent(firstHowto)
                        this.props.history.push(selectedCategoryName + "/" + firstHowto.label);
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getBreadcrumbLink(index) {
        let link = ""

        for (let i = 0; i < index; i++) {
            link += this.state.categoryNames[i] + "/"
        }


        // EMRETODO: ???? may be useful for debugging
        // console.log(link)

        return link
    }

    renderMarkdownContent(selectedHowto) {
        this.setState({
            selectedHowto: selectedHowto,
            markdownContent: selectedHowto.markdownContent
        })
    }

    render() {
        const { error, isLoaded, subCategoryList, howtoList, categoryNames, folderPath, selectedHowto } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // console.log("selectedCategoryName", selectedCategoryName)
            // console.log("selectedCategoryName.subCategoryList", selectedCategoryName.subCategoryList)
            // console.log("selectedCategoryName.howtoList", selectedCategoryName.howtoList)

            return (
                <Page span={{ span: 12 }}>
                    <Breadcrumb>
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
}

export default HowTo