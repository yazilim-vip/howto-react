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
import { MEMBER_LIST } from '../constants'

const memberToComponent = (tm) => (
    <Col key={tm.name} lg={{ span: 4 }} nd={{ span: 12 }}>
        <PersonCard portfolio={tm} />
    </Col>
)

const About = () => {
    const teamMemberList = MEMBER_LIST.teamMemberList
    const contributorList = MEMBER_LIST.contributorList
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
