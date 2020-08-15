import React from 'react';

// Bootstrap
import { Card, Image, Row, Col } from 'react-bootstrap';

const TeamInfoComponent = (props) => (
    <div>
        {
            props.team_member_list.map((team_member, i) => {
                // Return the element. Also pass key     
                return (
                    <Card className="mb-4">
                        <Card.Header style={styles.teamMemberCardHeader}>
                            {team_member.name} - ({team_member.title})
                        </Card.Header>

                        <Card.Body>
                            <Col md={{ span: 12 }}>
                                <Row>
                                    <Col md={{ span: 2 }}>
                                        <Image src={`img/${team_member.image_name}`} roundedCircle style={styles.teamMemberImg} />
                                    </Col>
                                    <Col md={{ span: 10 }}>

                                        <Card.Text>
                                            {team_member.info}
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Card.Body>
                    </Card>
                )
            })}
    </div>
)

const styles = {
    teamMemberImg: {
        width: '100%'
    },

    teamMemberCardHeader: {
        textAlign: 'center'
    }
}

export default TeamInfoComponent