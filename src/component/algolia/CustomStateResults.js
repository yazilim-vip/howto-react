import React from "react";
import {connectStateResults} from 'react-instantsearch-dom';

const CustomStateResults = ({searchResults}) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;
  const nbHits = searchResults && searchResults.nbHits;

  return (
	  <div>
		<div hidden={!hasResults}>There are {nbHits} results</div>
		<div hidden={hasResults}>There is no results</div>
	  </div>
  )
}

export default connectStateResults(CustomStateResults);