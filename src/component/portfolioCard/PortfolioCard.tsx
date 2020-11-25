import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Card } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { VipIcon } from '../vipIcon/VipIcon'

export interface PortfolioCardProps {
    name: string
    description: string | JSX.Element
    imageSource: string | undefined
    links: Object | undefined
}

export const PortfolioCard = ({
    name,
    description,
    imageSource,
    links
}: PortfolioCardProps) => {
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
        <Card className='mb-4 portfolio-card shadow'>
            {imageSource && <Card.Img variant='top' src={`${imageSource}`} />}
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className='mb-4 text-muted'>
                    {name}
                </Card.Subtitle>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            {links && (
                <Card.Footer className='text-center'>
                    {Object.entries(links).map(linkToIcon)}
                </Card.Footer>
            )}
        </Card>
    )
}

export default PortfolioCard
