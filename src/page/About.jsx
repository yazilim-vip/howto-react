import React from "react";

// Component
import Page from "../component/Page";
import PortfolioCard from "../component/PortfolioCard";
import { Row, Col } from "react-bootstrap";
import * as Content from '../content';

const memberToComponent = (tm) => (
  <Col lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 12 }}>
    <PortfolioCard portfolio={tm} />
  </Col>
);

const About = () => (
  <Page>
    <div className="about-page">
      <Col md={{ span: 12 }}>
        <Row>{Content.teamMemberList.map(memberToComponent)}</Row>
      </Col>

      <hr />

      <Col md={{ span: 12 }}>
        <Row>{Content.contributorList.map(memberToComponent)}</Row>
      </Col>
    </div>
  </Page>
);

export default About;
