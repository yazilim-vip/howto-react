import React from 'react';

// Bootstrap
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGitlab } from '@fortawesome/free-brands-svg-icons';

const linkToIcon = (i, url) => <FontAwesomeIcon icon={i} href={url} size="lg"  />

const PortfolioCard = (props) => {
    const portfolio = props.portfolio
    var portfolioImgElement
    var portfolioLinks = portfolio.links

    if (portfolio.imageSource) {
        portfolioImgElement = <Card.Img variant="top" src={`${portfolio.imageSource}`} />
    }

    var portfolioLinksElement
    for (var l in portfolioLinks) {
        portfolioLinksElement += linkToIcon(l, portfolioLinks[l])
    }

    return (
        <Card className="mb-4 shadow border border-dark">
            {portfolioImgElement}

            <Card.Body>
                <Card.Title>
                    {portfolio.name}
                </Card.Title>

                <Card.Text>
                    {portfolio.description}
                </Card.Text>
            </Card.Body>

            <Card.Footer className="text-muted">
                {portfolioLinksElement}
            </Card.Footer>
        </Card>
    )
}

export default PortfolioCard