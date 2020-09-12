import React from "react";
import { Breadcrumb, Col, ListGroup, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Page from "../component/Page";

class HowTo extends React.Component {
  constructor(props) {
    super();
    
    let categories = props.match.params[0].split("/")


    let selectedCategory = categories[categories.length - 1]

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      categories: categories,
      selectedCategory: selectedCategory
    };
  }

  componentDidMount() {
    fetch("http://yazilim.vip:9999/howto")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            selectedCategory: result[7].subCategoryList[2]
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
    const { error, isLoaded, selectedCategory, categories } = this.state;

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
              categories.map(item => <Breadcrumb.Item  className={item === selectedCategory ? 'active' : ""} href="#">{item}</Breadcrumb.Item>)
            }
          </Breadcrumb>

          <hr />

          <Row>
            <Col md="3">

              <h5 className="pl-3">Sub-Categories</h5>
              <ListGroup>
                {
                  selectedCategory.subCategoryList.map(item => <ListGroup.Item>{item.name}</ListGroup.Item>)
                }

                <br />

                <h5 className="pl-3">Contents</h5>
                {selectedCategory.howtoList.map(item => <ListGroup.Item>{item.label}</ListGroup.Item>)}


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