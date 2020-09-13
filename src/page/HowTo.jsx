import React from "react";
import { Breadcrumb, Col, ListGroup, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Router, Link } from "react-router-dom";
import Page from "../component/Page";

class HowTo extends React.Component {
  constructor(props) {
    super();

    let categoryNames = props.match.params[0].split("/")
    categoryNames.unshift("howto")
    let categorySelectedFlag;

    if (categoryNames.length === 1 && categoryNames[0] === "") {
      categorySelectedFlag = false
    } else {
      categorySelectedFlag = true
    }

    this.state = {
      error: null,
      isLoaded: false,
      categoryNames: categoryNames,
      selectedCategoryName: categoryNames[categoryNames.length - 1],
      categorySelectedFlag: categorySelectedFlag
    };
  }

  componentDidMount() {
    fetch(`http://yazilim.vip:9999/${this.props.match.params[0]}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("result", result)

          // howto-service should return error response if content is empty, this check is temporary
          if(Object.keys(result).length === 0){
            let error = "sads"
            this.setState({
              error
            });
          }

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

    for (var i = 0; i < index; i++) {
      route += "/" + this.state.categoryNames[i]
    }


    console.log("route", route)
    return route
  }

  render() {
    const { error, isLoaded, selectedCategory, categoryNames, categorySelectedFlag } = this.state;

    var input = '# This is a header\n\nAnd this is a paragraph'
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      let sideMenuSubCategoryElements = null
      let sideMenuHowToElements = null

      console.log("selectedCategory", selectedCategory)
      console.log("selectedCategory.subCategoryList", selectedCategory.subCategoryList)
      console.log("selectedCategory.howtoList", selectedCategory.howtoList)
      console.log("categorySelectedFlag", categorySelectedFlag)

      if (selectedCategory.subCategoryList !== undefined && categorySelectedFlag) {
        sideMenuSubCategoryElements = Object.keys(selectedCategory.subCategoryList).map(key => {
          return (
            <ListGroup.Item>
              <a href={`/howto/${this.props.match.params[0]}/${selectedCategory.subCategoryList[key].name}`}>
                {selectedCategory.subCategoryList[key].name}
              </a>
            </ListGroup.Item>
          )
        })
      }

      if (selectedCategory.howtoList !== undefined && categorySelectedFlag) {
        sideMenuHowToElements = Object.keys(selectedCategory.howtoList).map((key) =>
          <ListGroup.Item>{selectedCategory.howtoList[key].label}</ListGroup.Item>
        )
      }

      return (
        <Page span={{ span: 12 }}>
          <Breadcrumb>
            {
              categoryNames.map((item, index) => <Breadcrumb.Item href={this.getBreadcrumbLink(index + 1)} active={index + 1 === categoryNames.length ? true : false}>{item}</Breadcrumb.Item>)
            }
          </Breadcrumb>
          <hr />

          <Row>
            <Col md="3" className="border-right">
              <ListGroup>
                <h5 className="pl-3">Sub Categories</h5>
                {sideMenuSubCategoryElements}

                <br />

                <h5 className="pl-3">Contents</h5>
                {sideMenuHowToElements}
              </ListGroup>
            </Col>

            <Col md="9">
              <ReactMarkdown source={input}></ReactMarkdown>
            </Col>
          </Row>
        </Page>
      );
    }
  }
}

export default HowTo