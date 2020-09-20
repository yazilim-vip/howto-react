import React from "react";
import { connectAutoComplete } from 'react-instantsearch-dom';

const CustomAutocomplete = ({ hits, currentRefinement, refine }) => (
	<ul>

	  <li>
		<input
			type="search"
			value={currentRefinement}
			onChange={event => refine(event.currentTarget.value)}
		/>
	  </li>

	  {
	    hits.map(hit => (<li key={hit.objectID}>{hit.name}</li>))
	  }

	</ul>
);

export default connectAutoComplete(CustomAutocomplete)