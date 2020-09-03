import React from "react";

// Bootstrap
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const linkToIcon = (linkMap) => {
  const iconCode = linkMap[0];
  const url = linkMap[1];

  return (
    <a href={url} target="blank" className={`text-muted portfolio-link ${iconCode}`}>
      <FontAwesomeIcon
        icon={["fab", iconCode]}
        className="mr-3"
      />
    </a>
  );
};

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
    <Card className="mb-4 portfolio-card shadow border border-dark">
      {portfolioImgElement}
      <Card.Body>
        <Card.Title>{portfolio.name}</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">{props.portfolio.title}</Card.Subtitle>
        <Card.Text>{portfolio.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">{portfolioLinksElement}</Card.Footer>
    </Card>
  );
};

export default PortfolioCard;
