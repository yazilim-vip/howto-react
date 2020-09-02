import React from 'react';

// Bootstrap
import { Card, Image, Row, Col } from 'react-bootstrap';

const TeamMemberComponent = (props) => (
    <Card className="mb-4">
        <Card.Header>
            {props.team_member.name} - ({props.team_member.title})
        </Card.Header>

        <Card.Body>
            <Col md={{ span: 12 }}>
                <Row>
                    <Col md={{ span: 2 }}>
                        <Image src={`${props.team_member.image_name}`} roundedCircle style={styles.teamMemberImg} />
                    </Col>
                    <Col md={{ span: 10 }}>

                        <Card.Text>
                            {props.team_member.info}
                        </Card.Text>
                    </Col>
                </Row>
            </Col>
        </Card.Body>
    </Card>
)

const styles = {
    teamMemberImg: {
        width: '100%'
    }
}

export default TeamMemberComponent