import React from "react";

// Bootstrap
import { Card } from "react-bootstrap";
import YvipIcon from "./YvipIcon";

const linkToIcon = (linkMap) => {
  const iconCode = linkMap[0];
  const url = linkMap[1];

  return (
    <a href={url} target="blank" className={`text-muted portfolio-link`}>
      <YvipIcon iconCode={iconCode} />
    </a>
  );
};

const PortfolioCard = (props) => {
  const portfolio = props.portfolio;
  const portfolioLinks = portfolio.links;

  var portfolioFooterElement;
  var portfolioImgElement;

  if (portfolio.imageSource) {
    portfolioImgElement = (
      <Card.Img variant="top" src={`${portfolio.imageSource}`} />
    );
  }

  if (portfolioLinks !== undefined && portfolioLinks !== null) {
    portfolioFooterElement = (
      <Card.Footer className="text-center">
        {Object.entries(portfolioLinks).map(linkToIcon)}
      </Card.Footer>
    );
  }

  return (
    <Card className="mb-4 portfolio-card shadow">
      {portfolioImgElement}
      <Card.Body>
        <Card.Title>{portfolio.name}</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          {props.portfolio.title}
        </Card.Subtitle>
        <Card.Text>{portfolio.description}</Card.Text>
      </Card.Body>
      {portfolioFooterElement}
    </Card>
  );
};

export default PortfolioCard;
