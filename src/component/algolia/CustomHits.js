import React from "react";
import { connectHits } from 'react-instantsearch-dom';

const CustomHits = ({ hits }) => (
	<ol>
	  {hits.map(hit => (
		  <li key={hit.objectID}>{hit.name}</li>
	  ))}
	</ol>
);

export default connectHits(CustomHits)