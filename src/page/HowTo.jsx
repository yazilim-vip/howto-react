import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import HowToMenu from "../component/HowToMenu";
import Page from "../component/Page";

class HowTo extends React.Component {
    constructor(props) {
        super(undefined);

        let fullPath = props.match.params[0]
        let folderPath
        let selectedCategory
        let selectedContent = null

        let categoryNames = fullPath.split("/")
        categoryNames.unshift("howto")

        if (fullPath.endsWith(".howto")) {
            selectedContent = categoryNames.pop()
            folderPath = fullPath.substring(0, fullPath.lastIndexOf("/"))
        } else {
            folderPath = fullPath
        }

        selectedCategory = categoryNames[categoryNames.length - 1]

        this.state = {
            error: null,
            isLoaded: false,
            fullPath: fullPath,
            folderPath: folderPath,
            subCategoryList: null,
            howtoList: null,
            categoryNames: categoryNames,
            selectedCategory: selectedCategory,
            selectedContent: selectedContent,
            markdownContent: null
        };

        this.renderMarkdownContent = this.renderMarkdownContent.bind(this)
    }

    componentDidMount() {
        let {selectedCategory, selectedContent, folderPath} = this.state

        fetch("http://yazilim.vip:9999/" + folderPath)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("selectedContent", selectedContent)
                    console.log("markdownContent", result[selectedCategory].howtoList)

                    // howto-service should return error response if content is empty, this check is temporary
                    if (Object.keys(result).length === 0) {
                        let error = "error"
                        this.setState({
                            error
                        });
                    }

                    this.setState({
                        isLoaded: true,
                        subCategoryList: result[selectedCategory].subCategoryList,
                        howtoList: result[selectedCategory].howtoList
                    });


                    if(selectedContent !== null){
                        this.renderMarkdownContent(result[selectedCategory].howtoList[selectedContent].markdownContent)
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
            link += "/" + this.state.categoryNames[i]
        }

        return link
    }

    renderMarkdownContent(markdownContent) {
        this.setState({
            markdownContent: markdownContent
        })
    }

    render() {
        const {error, isLoaded, subCategoryList, howtoList, categoryNames, folderPath} = this.state;

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
                    <hr/>

                    <Row>
                        {/*Menus*/}
                        <Col md="3" className="border-right">
                            <HowToMenu
                                folderPath={folderPath}
                                type="subcategory"
                                title="Sub Categories"
                                items={subCategoryList}
                            />
                            <br/>
                            <HowToMenu
                                folderPath={folderPath}
                                type="content"
                                title="Contents"
                                items={howtoList}
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