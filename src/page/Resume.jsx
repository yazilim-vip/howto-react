import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Cv from '../component/Cv';

// Component
import Page from '../component/Page';


const Resume = (props) => {

  const name = props.match.params.name
  return (
    <Cv />
  )
}

export default Resume;
