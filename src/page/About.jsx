import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Row, Col } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { Page, PersonCard } from '../component'

// Constants
import * as Content from '../constants/memberList'

const memberToComponent = (tm) => (
  <Col key={tm.name} lg={{ span: 4 }} nd={{ span: 12 }}>
    <PersonCard portfolio={tm} />
  </Col>
)

const About = () => {
  const teamMemberList = Content.members.teamMemberList
  const contributorList = Content.members.contributorList
  return (
    <Page>
      <Row>{teamMemberList.map(memberToComponent)}</Row>

      {contributorList.length !== 0 && (
        <>
          <hr />
          <Row>{contributorList.map(memberToComponent)}</Row>
        </>
      )}
    </Page>
  )
}

export default About
