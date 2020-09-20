import React from "react";
import PropTypes from 'prop-types';
import HowToMenu from "./HowToMenu";
import {Col, Row, Alert} from "react-bootstrap";

import ReactMarkdown from "react-markdown";

import HowToBreadcrumb from "./HowToBreadcrumb";

import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, connectStateResults} from 'react-instantsearch-dom';
import HOWTO_ITEM_TYPE from '../constants/types';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_READ_ONLY_SECRET);
const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME

const SearchStateResults = ({searchResults}) => {
  const hasResults = searchResults && searchResults.nbHits !== 0

  let categoryHits = []
  let howtoHits = []

  if (hasResults) {
	searchResults.hits.map(hit => {
	  if (hit.type === HOWTO_ITEM_TYPE.HOWTO) {
		howtoHits.push(hit)
	  } else if (hit.type === HOWTO_ITEM_TYPE.CATEGORY) {
		categoryHits.push(hit)
	  }
	})

	console.log("categoryHits", categoryHits)
	console.log("howtoHits", howtoHits)
  }

  return (<div/>)
}

const CustomStateResults = connectStateResults(SearchStateResults);

const conditionalQuery = {
  search(requests) {
	if (requests.every(({params}) => !params.query.trim())) {
	  console.log('Empty Query');

	  return Promise.resolve({
		results: requests.map(() => ({
		  hits: [],
		  nbHits: 0,
		  nbPages: 0,
		  processingTimeMS: 0,
		})),
	  });
	}

	return searchClient.search(requests);
  }
}

var HowToBrowser = (props) => {

  const {howtoRequest, selectedCategory, selectedHowto, renderCategory, renderHowto} = props

  var renderHowtoContentElement = () => {
	if (selectedHowto !== null) {
	  return <ReactMarkdown source={selectedHowto.markdownContent}/>
	}

	if (howtoRequest.howtoSelectedFlag || selectedCategory.howtoList.length > 0) {
	  return (
		  <Alert key={1} variant={"danger"}>
			Howto <b>{howtoRequest.selectedHowtoName}</b> not found on archive.
		  </Alert>
	  )
	}
  }

  var renderMainContentElement = () => {
	if (selectedCategory === null) {
	  return (
		  <Alert key={1} variant={"danger"}>
			Category <b>{howtoRequest.folderPath}</b> not found on archive.
		  </Alert>
	  )
	}

	return (
		<div>

		  {/*Sub Category Menu*/}
		  <HowToMenu
			  folderPath={howtoRequest.folderPath}
			  type={HOWTO_ITEM_TYPE.CATEGORY}
			  items={selectedCategory.subCategoryList}
			  selectedCategory={selectedCategory}
			  rootCategorySelected={howtoRequest.rootCategorySelectedFlag}
			  renderCategory={renderCategory}
		  />

		  <hr/>

		  <Row>
			{/*HowTo Menu*/}
			<Col md="3" className="border-right">
			  <HowToMenu
				  folderPath={howtoRequest.folderPath}
				  type={HOWTO_ITEM_TYPE.HOWTO}
				  items={selectedCategory.howtoList}
				  selectedHowto={selectedHowto}
				  renderHowto={renderHowto}
			  />
			</Col>

			{/*Content*/}
			<Col md="9">
			  {renderHowtoContentElement()}
			</Col>
		  </Row>
		</div>
	)
  }

  return (
	  <div>

		<HowToBreadcrumb
			categoryNames={howtoRequest.categoryNames}
			rootFlag={howtoRequest.rootCategorySelectedFlag}
			renderCategory={renderCategory}
		/>

		<InstantSearch searchClient={conditionalQuery}
					   indexName={indexName}
					   onSearchStateChange={searchState => console.log('=====> ', searchState)}>
		  <SearchBox/>
		  <CustomStateResults/>
		</InstantSearch>

		{renderMainContentElement()}
	  </div>
  )
}

HowToBrowser.propTypes = {

  howtoRequest: PropTypes.shape({
	fullPath: PropTypes.string,
	folderPath: PropTypes.string,
	categoryNames: PropTypes.array,
	selectedHowtoName: PropTypes.string,
	howtoSelectedFlag: PropTypes.bool,
	rootCategorySelectedFlag: PropTypes.bool
  }),

  // filled by data from service
  selectedCategory: PropTypes.object,
  selectedHowto: PropTypes.object,
  renderCategory: PropTypes.func,
  renderHowto: PropTypes.func
};

export default HowToBrowser 