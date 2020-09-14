import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import HowToMenu from "../component/HowToMenu";
import Page from "../component/Page";
import * as constants from '../constants';

class HowTo extends React.Component {
    constructor(props) {
        super(undefined);

        let fullPath = props.match.params[0].replace(/\/$/, "")
        let folderPath
        let selectedCategory
        let selectedHowto = null

        let categoryNames = fullPath.split("/")

        if (fullPath.endsWith(".howto")) {
            selectedHowto = categoryNames.pop()
            folderPath = fullPath.substring(0, fullPath.lastIndexOf("/"))
        } else {
            folderPath = fullPath
        }

        categoryNames.unshift(constants.howtoPath)

        if (folderPath === "") {
            selectedCategory = "howto"
        } else {
            folderPath = "/" + folderPath
            selectedCategory = categoryNames[categoryNames.length - 1]
        }

        console.log("folderPath", folderPath)
        console.log("selectedHowto", selectedHowto)
        console.log("selectedCategory", selectedCategory)

        this.state = {
            error: null,
            isLoaded: false,
            fullPath: fullPath,
            folderPath: folderPath,
            subCategoryList: null,
            howtoList: null,
            categoryNames: categoryNames,
            selectedCategory: selectedCategory,
            selectedHowto: selectedHowto,
            markdownContent: null
        };

        this.renderMarkdownContent = this.renderMarkdownContent.bind(this)
    }

    componentDidMount() {
        let {selectedCategory, selectedHowto, folderPath} = this.state

        fetch(constants.apiUrl + "?path=" + folderPath)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("url", constants.apiUrl + folderPath)
                    console.log("result", result)

                    // howto-service should return error response if content is empty, this check is temporary
                    if (Object.keys(result).length === 0) {
                        let error = "error"
                        this.setState({
                            error
                        });

                        return
                    }

                    console.log("selectedCategory", selectedCategory)

                    let subCategoryList = result[selectedCategory].subCategoryList
                    let howtoList = result[selectedCategory].howtoList

                    this.setState({
                        isLoaded: true,
                        subCategoryList: subCategoryList,
                        howtoList: howtoList
                    });

                    if (selectedHowto !== null) {
                        this.renderMarkdownContent(result[selectedCategory].howtoList[selectedHowto])
                    } else if(Object.keys(howtoList).length !== 0){
                        let firstHowtoIndex = Object.keys(howtoList)[0]
                        let firstHowto = howtoList[firstHowtoIndex]

                        this.renderMarkdownContent(firstHowto)
                        this.props.history.push(selectedCategory + "/" + firstHowto.label);
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

        console.log(link)

        return link
    }

    renderMarkdownContent(selectedHowto) {
        this.setState({
            selectedHowto: selectedHowto,
            markdownContent: selectedHowto.markdownContent
        })
    }

    render() {
        const {error, isLoaded, subCategoryList, howtoList, categoryNames, folderPath, selectedHowto} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // console.log("selectedCategory", selectedCategory)
            // console.log("selectedCategory.subCategoryList", selectedCategory.subCategoryList)
            // console.log("selectedCategory.howtoList", selectedCategory.howtoList)

            return (
                <Page span={{span: 12}}>
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

                    <hr/>

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
                            <ReactMarkdown source={this.state.markdownContent}/>
                        </Col>
                    </Row>
                </Page>
            );
        }
    }
}

export default HowTo