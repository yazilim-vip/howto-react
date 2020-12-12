import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Row, Col } from 'react-bootstrap'

// ---------------------------
//  Project Dependencies
// ---------------------------
import { PageLayout, PersonCard, PersonCardProps } from 'yvip-website/component'
import { TEAM_MEMBER_LIST } from 'yvip-website/constants'

const memberToComponent = (tm: PersonCardProps) => (
    <Col key={tm.name} lg={{ span: 4 }} md={{ span: 12 }}>
        {/* <PersonCard portfolio={tm} /> */}
        <PersonCard {...tm} />
    </Col>
)

export const About = () => {
    return (
        <PageLayout>
            <Row>{TEAM_MEMBER_LIST.map(memberToComponent)}</Row>
        </PageLayout>
    )
}
