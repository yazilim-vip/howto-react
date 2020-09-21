import React from "react";
import PropTypes from 'prop-types';
import HowToMenu from "./HowToMenu";
import {Col, Row, Alert} from "react-bootstrap";
import _ from "underscore"
import ReactMarkdown from "react-markdown";
import HowToBreadcrumb from "./HowToBreadcrumb";
import algoliasearch from 'algoliasearch/lite';
import HOWTO_ITEM_TYPE from '../../constants/types';
import SearchField from "react-search-field";

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_READ_ONLY_SECRET)
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME)

class HowToBrowser extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  categoryHits: [],
	  howtoHits: []
	}
  }

  search = (value, event) => {
	let query = value

	console.log(query)
	let categoryHits = []
	let howtoHits = []

	if (_.isEmpty(query)) {
	  this.setState({
		categoryHits: categoryHits,
		howtoHits: howtoHits
	  })
	} else {
	  return index
		  .search(query)
		  .then(res => {
			let hits = res.hits
			console.log(hits)

			if (!_.isEmpty(hits)) {

			  hits.map(hit => {
				if (hit.type === HOWTO_ITEM_TYPE.CATEGORY) {
				  categoryHits.push(hit)
				} else if (hit.type === HOWTO_ITEM_TYPE.HOWTO) {
				  howtoHits.push(hit)
				}
			  })

			  this.setState({
				categoryHits: categoryHits,
				howtoHits: howtoHits
			  })
			}

			return res
		  })
		  .catch(exception => console.error(exception))
	}
  }

  render() {

	const {howtoRequest, selectedCategory, selectedHowto, renderCategory, renderHowto} = this.props

	const renderHowtoContentElement = () => {
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
	};

	const renderMainContentElement = () => {
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
				items={_.isEmpty(this.state.categoryHits) ? selectedCategory.subCategoryList : _.extend({}, this.state.categoryHits)}
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
					items={_.isEmpty(this.state.howtoHits) ? selectedCategory.howtoList : _.extend({}, this.state.howtoHits)}
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
	};

	return (
		<div>

		  <Row className="justify-content-between">
			<HowToBreadcrumb
				categoryNames={howtoRequest.categoryNames}
				rootFlag={howtoRequest.rootCategorySelectedFlag}
				renderCategory={renderCategory}
			/>

			<SearchField
				placeholder="Search..."
				onChange={(value, event) => this.search(value, event)}
				classNames="mr-3"
			/>
		  </Row>

		  {renderMainContentElement()}
		</div>
	)
  }
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
}

export default HowToBrowser 