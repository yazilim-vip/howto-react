import React from "react";

// Component
import Page from "../component/Page";
import PortfolioCard from "../component/PortfolioCard";
import { CardDeck, Row, Col } from "react-bootstrap";

const team_member_list = [
  {
    name: "Mehmet Arif Emre Sen",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    imageSource: "https://thispersondoesnotexist.com/image",
    title: "Major Contributor",
    links: {
      gitlab: "https://thispersondoesnotexist.com/image",
      medium: "https://thispersondoesnotexist.com/image",
      "google-play": "https://thispersondoesnotexist.com/image",
    },
  },
  {
    name: "Burak Erkan",
    title: "Major Contributor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    imageSource: "https://thispersondoesnotexist.com/image",
    links: {
      gitlab: "https://thispersondoesnotexist.com/image",
      medium: "https://thispersondoesnotexist.com/image",
      "google-play": "https://thispersondoesnotexist.com/image",
    },
  },
  {
    name: "Mustafa Arif Sisman",
    title: "Major Contributor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    imageSource: "https://thispersondoesnotexist.com/image",
    links: {
      gitlab: "https://thispersondoesnotexist.com/image",
      medium: "https://thispersondoesnotexist.com/image",
      "google-play": "https://thispersondoesnotexist.com/image",
    },
  },
];

const contributor_list = [
  {
    name: "Ahmet Gurdal",
    title: "Contributor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    imageSource: "https://thispersondoesnotexist.com/image",
    links: {
      gitlab: "https://thispersondoesnotexist.com/image",
      medium: "https://thispersondoesnotexist.com/image",
      "google-play": "https://thispersondoesnotexist.com/image",
    },
  },
];

const memberToComponent = (tm) => (
  <Col lg={{ span: 4 }}>
    <PortfolioCard portfolio={tm} />
  </Col>
);

const About = () => (
  <Page>
    <div className="about-page">
      <Col md={{ span: 12 }}>
        <Row>{team_member_list.map(memberToComponent)}</Row>
      </Col>

      <hr />

      <Col md={{ span: 12 }}>
        <Row>{contributor_list.map(memberToComponent)}</Row>
      </Col>
    </div>
  </Page>
);

export default About;
