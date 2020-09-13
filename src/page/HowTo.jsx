import React from "react";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import HowToMenu from "../component/HowToMenu";
import Page from "../component/Page";

class HowTo extends React.Component {
    constructor(props) {
        super(undefined);

        let categoryNames = props.match.params[0].split("/")
        categoryNames.unshift("howto")

        this.state = {
            error: null,
            isLoaded: false,
            markdownContent: null,
            categoryNames: categoryNames,
            selectedCategoryName: categoryNames[categoryNames.length - 1]
        };

        this.renderMarkdownContent = this.renderMarkdownContent.bind(this)
    }

    componentDidMount() {
        fetch(`http://yazilim.vip:9999/${this.props.match.params[0]}`)
            .then(res => res.json())
            .then(
                (result) => {
                    // howto-service should return error response if content is empty, this check is temporary
                    // if (Object.keys(result).length === 0) {
                    //     let error = "error"
                    //     this.setState({
                    //         error
                    //     });
                    // }

                    this.setState({
                        isLoaded: true,
                        selectedCategory: result[this.state.selectedCategoryName],
                    });
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
        let route = ""

        for (let i = 0; i < index; i++) {
            route += "/" + this.state.categoryNames[i]
        }

        return route
    }

    renderMarkdownContent(markdownContent){
        console.log(markdownContent)
        this.setState({markdownContent: markdownContent})
    }

    render() {
        const {error, isLoaded, selectedCategory, categoryNames} = this.state;
        // const input = '# This is a header\n\nAnd this is a paragraph';

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
                                route={this.props.match.params[0]}
                                type="subcategory"
                                title="Sub Categories"
                                items={selectedCategory.subCategoryList}
                            />
                            <br/>
                            <HowToMenu
                                route={this.props.match.params[0]}
                                type="content"
                                title="Contents"
                                items={selectedCategory.howtoList}
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