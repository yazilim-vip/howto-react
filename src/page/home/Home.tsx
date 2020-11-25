import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Card } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { PageLayout } from '../../component'
import './Home.scss'

export const Home = (props: any) => (
    <PageLayout>
        <Card className='mb-4 portfolio-card shadow yvip-card'>
            <div className='yvip-card-img img-responsive img-fluid' />
            <Card.Body>
                <Card.Title>
                    <h1 className='text-center display-4 pb-2'>
                        Do the right, not the easy.
                    </h1>
                </Card.Title>

                <Card.Text>
                    To keep this platform open to everyone who is competent and
                    willing to share what we call an open source world. A
                    platform aimed at presenting our competencies to the open
                    source world without waiting for a response.
                </Card.Text>
            </Card.Body>
        </Card>
    </PageLayout>
)
