import React from "react";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Page from "../component/Page";

class HowTo extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://yazilim.vip:9999/howto")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
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
    const { error, isLoaded, items } = this.state;

    var input = '# This is a header\n\nAnd this is a paragraph'
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Page span={{ span: 12 }}>
          <Row>
            <Col md="2">
            <ul>
                {items.map(item => (
                  <li key={item.name}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md="10">
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                  Library
            </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
              </Breadcrumb>

              <hr/>

              <ReactMarkdown source={input}></ReactMarkdown>
            </Col>
          </Row>
        </Page>
      );
    }
  }
}

export default HowTo