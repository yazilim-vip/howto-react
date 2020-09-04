import React from "react";

// Component
import Page from "../component/Page";
import { Jumbotron, Container } from "react-bootstrap";

const Home = (props) => (
  <Page>
    <Jumbotron fluid>
      <Container>
        <h1 class="display-4 text-center">Do the right, not the easy</h1>
        <p className="text-justify ">
          Yazılımcının açık kaynak dünyası diye nitelendirdiğimiz yetkin olan ve paylaşmak isteyen herkese kapısı açık bu platformu güncel tutmak. Yetkinliklerimizi karşılık beklemeden açık kaynak dünyasına sunmak amaçlı bir platform.
          </p>
        <p className="text-justify ">
          To keep this platform open to everyone who is competent and willing to share what we call an open source world. A platform aimed at presenting our competencies to the open source world without waiting for a response.
        </p>
      </Container>
    </Jumbotron>
  </Page>
);

export default Home;
