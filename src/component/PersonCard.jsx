import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Card } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import VipIcon from './VipIcon'
import Cv from './Cv'

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
  const portfolioLinks = portfolio.links
  const cvSource = portfolio.cvSource

  const cvExists = !!(cvSource !== undefined && cvSource !== null)
  console.log(
    'cvExists ==> ',
    portfolio.name,
    cvExists,
    'cvSouce ==>',
    cvSource
  )

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

        {cvExists && (
          <>
            <hr />
            <Cv cvSource={cvSource} modalSize='lg' />
          </>
        )}
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
