import React from "react";

// Bootstrap
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const linkToIcon = (linkMap) => {
  const iconCode = linkMap[0];
  const url = linkMap[1];

  const colorMap = {
    gitlab: "#E2432A",
    medium: "#000000",
    google_play: "#3BCCFF",
  };

  //   var color = "#000000";
  //   var key = iconCode.replaceAll("-", "_")
  //   if (colorMap[key]) {
  //     color = colorMap[key];
  //   }

  return (
    <a href={url} target="blank" className="text-dark portfolio-link">
      <FontAwesomeIcon
        icon={["fab", iconCode]}
        size="lg"
        className="mr-3"
        color={colorMap[iconCode.split("-").join("_")]}
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
    <Card className="mb-4 shadow border border-dark">
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
