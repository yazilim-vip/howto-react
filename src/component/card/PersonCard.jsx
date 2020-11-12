import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Button, Card } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { VipIcon } from '../'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

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

const renderCv = (cvSource) => {
  return (
    <div className='text-center'>
      <hr />

      <Button
        className='d-block'
        variant='outline-primary'
        href={cvSource}
        target='_blank'
        rel='noopener noreferrer'
      >
        <FontAwesomeIcon icon={faFile} className='mr-3' />
        Curriculum Vitae
      </Button>
    </div>
  )
}

const PortfolioCard = (props) => {
  const portfolio = props.portfolio
  const portfolioLinks = portfolio.links
  const cvSource = portfolio.cvSource

  return (
    <Card className='portfolio-card shadow'>
      {portfolio.imageSource && (
        <Card.Img
          className='mx-auto mt-2 border border-secondary'
          style={{
            width: '70%'
          }}
          variant='top'
          src={`${portfolio.imageSource}`}
        />
      )}

      <Card.Body>
        <div className='text-center mb-3'>
          <Card.Title>{portfolio.name}</Card.Title>
          <Card.Subtitle className='text-muted'>
            {props.portfolio.title}
          </Card.Subtitle>
        </div>

        <div id='example-collapse-text'>
          <Card.Text className='border-top pt-3'>
            {portfolio.description}
          </Card.Text>
        </div>

        {cvSource ? renderCv(cvSource) : null}
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
