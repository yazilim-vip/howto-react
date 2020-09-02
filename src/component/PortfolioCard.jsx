import React from "react";

// Bootstrap
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";

const linkToIcon = (i, url) => (
  <FontAwesomeIcon icon={faGitlab} href={url} size="lg" className="mr-3" />
);

const PortfolioCard = (props) => {
  const portfolio = props.portfolio;
  const portfolioLinks = portfolio.links;

  var portfolioImgElement;
  var portfolioLinksElement;

  if (portfolio.imageSource) {
    portfolioImgElement = (
      <Card.Img variant="top" src={`${portfolio.imageSource}`} />
    );
  }

  if (portfolioLinks !== undefined && portfolioLinks !== null) {
    portfolioLinksElement = Object.entries(portfolioLinks).map(linkToIcon);
  }

  return (
    <Card className="mb-4 shadow border borde  r-dark">
      {portfolioImgElement}

      <Card.Body>
        <Card.Title>{portfolio.name}</Card.Title>

        <Card.Text>{portfolio.description}</Card.Text>
      </Card.Body>

      <Card.Footer className="text-muted">{portfolioLinksElement}</Card.Footer>
    </Card>
  );
};

export default PortfolioCard;
