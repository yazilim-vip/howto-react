import React from "react";

// Component
import Page from "../component/Page";
import PersonCard from "../component/PersonCard";
import { Row, Col } from "react-bootstrap";
import * as Content from '../constants/memberList';

const memberToComponent = (tm) => (
  <Col key={tm.name} lg={{ span: 4 }} nd={{ span: 12 }}>
    <PersonCard portfolio={tm} />
  </Col>
);

const About = () => {
  const teamMemberList = Content.members.teamMemberList;
  const contributorList = Content.members.contributorList;
  return (
    <Page>
      <Row>
        {teamMemberList.map(memberToComponent)}
      </Row>

      {(contributorList.length !== 0) && (
        <>
          <hr />
          <Row>
            {contributorList.map(memberToComponent)}
          </Row>
        </>
      )}
    </Page>
  )
};

export default About;
