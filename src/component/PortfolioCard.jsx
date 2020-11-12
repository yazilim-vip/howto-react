import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Card } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { VipIcon } from './'

const linkToIcon = (linkMap) => {
  const iconCode = linkMap[0]
  const url = linkMap[1]

  return (
    <a
      href={url}
      key={url}
      target='blank'
      className='text-muted portfolio-link'
    >
      <VipIcon iconCode={iconCode} />
    </a>
  )
}

const PortfolioCard = (props) => {
  const portfolio = props.portfolio
  const portfolioImageSource = portfolio.imageSource
  const portfolioLinks = portfolio.links

  return (
    <Card className='mb-4 portfolio-card shadow'>
      {portfolioImageSource && (
        <Card.Img variant='top' src={`${portfolioImageSource}`} />
      )}
      <Card.Body>
        <Card.Title>{portfolio.name}</Card.Title>
        <Card.Subtitle className='mb-4 text-muted'>
          {portfolio.title}
        </Card.Subtitle>
        <Card.Text>{portfolio.description}</Card.Text>
      </Card.Body>
      {portfolioLinks !== undefined && portfolioLinks !== null && (
        <Card.Footer className='text-center'>
          {Object.entries(portfolioLinks).map(linkToIcon)}
        </Card.Footer>
      )}
    </Card>
  )
}

export default PortfolioCard
