import React from "react";
import { Breadcrumb, Col, ListGroup, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Page from "../component/Page";

class HowTo extends React.Component {
  constructor(props) {
    super();

    let categoryNames = props.match.params[0].split("/")
    let selectedCategoryName = categoryNames[categoryNames.length - 1]

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      categoryNames: categoryNames,
      selectedCategoryName: selectedCategoryName
    };
  }

  componentDidMount() {
    fetch("http://yazilim.vip:9999/howto")
      .then(res => res.json())
      .then(
        (result) => {

          var currCategory = null

          console.log("this.state.categoryNames", this.state.categoryNames)
          for (var catNameIndex in this.state.categoryNames) {
            var catName = this.state.categoryNames[catNameIndex]
            console.log(`Checking for ${catName}`)

            if (currCategory === null) {
              currCategory = result[catName]
            } else {
              currCategory = currCategory.subCategoryList[catName]
            }
          }

          console.log("currCategory", currCategory)

          this.setState({
            isLoaded: true,
            items: result,
            selectedCategory: currCategory
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


  render() {
    const { error, isLoaded, selectedCategory, categoryNames } = this.state;

    var input = '# This is a header\n\nAnd this is a paragraph'
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Page span={{ span: 12 }}>
          <Breadcrumb>
            {
              categoryNames.map(item => <Breadcrumb.Item href="#">{item}</Breadcrumb.Item>)
            }
          </Breadcrumb>

          <hr />

          <Row>
            <Col md="3">

              <h5 className="pl-3">Sub-Categories</h5>
              <ListGroup>
                {
                  Object.keys(selectedCategory.subCategoryList).map(function (key) {
                    return (
                      <ListGroup.Item>{selectedCategory.subCategoryList[key].name}</ListGroup.Item>
                    )
                  })
                }

                <br />

                <h5 className="pl-3">Contents</h5>
                {
                  Object.keys(selectedCategory.howtoList).map(function (key) {
                    return (
                      <ListGroup.Item>{selectedCategory.howtoList[key].label}</ListGroup.Item>
                    )
                  })
                }


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