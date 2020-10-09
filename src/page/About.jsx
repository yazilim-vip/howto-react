import React from "react";

// Component
import Page from "../component/Page";
import PortfolioCard from "../component/PortfolioCard";
import { Row, Col } from "react-bootstrap";
import * as Content from '../constants/memberList';

const memberToComponent = (tm) => (
  <Col key={tm.name} lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 12 }}>
    <PortfolioCard portfolio={tm} />
  </Col>
);

const About = () => (
  <Page>
      <Row>
        {Content.members.teamMemberList.map(memberToComponent)}
      </Row>

      <hr />

      <Row>{
        Content.members.contributorList.map(memberToComponent)}
      </Row>
  </Page>
);

export default About;
