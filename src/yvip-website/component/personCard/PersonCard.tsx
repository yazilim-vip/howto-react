import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

// ---------------------------
//  Project Dependencies
// ---------------------------
import { VipIcon } from 'yvip-website/component'

export interface PersonCardProps {
    name: string
    title: string
    description: string | JSX.Element
    imageSource: string
    links: Object | undefined
    cvSource: string | undefined
}

export const PersonCard = ({
    name,
    title,
    description,
    imageSource,
    links,
    cvSource
}: PersonCardProps) => {
    const linkToIcon = (linkMap: any) => {
        const iconCode = linkMap[0]
        const url = linkMap[1]
        return (
            <span className='text-muted portfolio-link'>
                <VipIcon iconCode={iconCode} link={url} className={'null'} />
            </span>
        )
    }

    return (
        <Card className='portfolio-card shadow'>
            {imageSource && (
                <Card.Img
                    className='mx-auto mt-2 border border-secondary'
                    style={{
                        width: '70%'
                    }}
                    variant='top'
                    src={`${imageSource}`}
                />
            )}

            <Card.Body>
                <div className='text-center mb-3'>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className='text-muted'>
                        {title}
                    </Card.Subtitle>
                </div>

                <div id='example-collapse-text'>
                    <Card.Text className='border-top pt-3'>
                        {description}
                    </Card.Text>
                </div>

                {cvSource && (
                    <div className='text-center'>
                        <hr />

                        <Button
                            className='d-block'
                            variant='outline-primary'
                            href={cvSource}
                            target='_blank'
                        >
                            <FontAwesomeIcon icon={faFile} className='mr-3' />
                            Curriculum Vitae
                        </Button>
                    </div>
                )}
            </Card.Body>

            {links && (
                <Card.Footer className='text-center'>
                    {Object.entries(links).map(linkToIcon)}
                </Card.Footer>
            )}
        </Card>
    )
}
