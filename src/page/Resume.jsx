import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Alert, Toast } from 'react-bootstrap';

import Page from '../component/Page';
import EmreCv from '../content/EmreCv';

const Resume = (props) => {

  const name = props.match.params.name

  if (name === "emre".toLocaleLowerCase()) {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'relative',
          minHeight: '100px',
          height: '100%'
        }}
      >

        <EmreCv printable={true} />
      </div>
    )
  }

  return (
    <Page>
      <Alert variant="danger">No CV found for {name}</Alert>
    </Page>
  )
}

export default Resume