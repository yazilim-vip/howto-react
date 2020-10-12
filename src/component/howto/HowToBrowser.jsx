import React from "react";
import HowToMenu from "./HowToMenu";
import { Col, Row, Alert, InputGroup, FormControl } from "react-bootstrap";
import _ from "underscore"
import ReactMarkdown from "react-markdown";
import HowToBreadcrumb from "./HowToBreadcrumb";
import algoliasearch from 'algoliasearch/lite';
import HOWTO_ITEM_TYPE from '../../constants/types';

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_READ_ONLY_SECRET)
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME)

class HowToBrowser extends React.Component {

	constructor(props) {
		super();

		// console.log("props", props);

		// this.state = {
		//   categoryHits: [],
		//   howtoHits: [],
		//   query: ""
		// }
	}

	search = async (query) => {
		console.log(query)
		let categoryHits = []
		let howtoHits = []

		if (_.isEmpty(query)) {
			this.setState({
				categoryHits: categoryHits,
				howtoHits: howtoHits,
				query: query
			})
		} else {
			try {
				const res = await index
					.search(query);
				let hits = res.hits;
				console.log(hits);

				if (!_.isEmpty(hits)) {
					hits.forEach(hit => {
						if (hit.type === HOWTO_ITEM_TYPE.CATEGORY_HIT) {
							categoryHits.push(hit);
						} else if (hit.type === HOWTO_ITEM_TYPE.HOWTO_HIT) {
							howtoHits.push(hit);
						}
					});

					this.setState({
						categoryHits: categoryHits,
						howtoHits: howtoHits,
						query: query
					});
				}
				return res;
			} catch (exception) {
				return console.error(exception);
			}
		}
	}

	render() {
		const { howtoSelectedFlag, selectedCategory, selectedHowto, selectedHowtoName, renderCategory, renderHowto } = this.props

		const renderHowtoContentElement = () => {
			if (selectedHowto !== null) {
				return <ReactMarkdown source={selectedHowto.markdownContent} />
			}

			if (howtoSelectedFlag || selectedCategory.howtoList.length > 0) {
				return (
					<Alert key={1} variant={"danger"}>
						Howto <b>{selectedHowtoName}</b> not found on archive.
					</Alert>
				)
			}
		};

		const renderMainContentElement = () => {
			if (selectedCategory === null) {
				return (
					<Alert key={1} variant={"danger"}>
						Category <b>{this.props.folderPath}</b> not found on archive.
					</Alert>
				)
			}

			return (
				<Row>

					<Col md="3" className="border-right left-col">
						<InputGroup className="mb-3">
							<FormControl
								value={this.props.query}
								placeholder="Search..."
								aria-label="Search"
								onChange={event => this.search(event.target.value)}
							/>

						</InputGroup>

						{/*Sub Category Menu*/}
						<HowToMenu
							folderPath={this.props.folderPath}
							type={_.isEmpty(this.props.categoryHits) ? HOWTO_ITEM_TYPE.CATEGORY : HOWTO_ITEM_TYPE.CATEGORY_HIT}
							title="Categories"
							items={_.isEmpty(this.props.categoryHits) ? selectedCategory.subCategoryList : _.extend({}, this.props.categoryHits)}
							selectedCategory={selectedCategory}
							rootCategorySelected={this.props.rootCategorySelectedFlag}
							renderCategory={renderCategory}
							clearHits={() => this.search("")}
						/>

						{/*HowTo Menu*/}
						<HowToMenu
							folderPath={this.props.folderPath}
							type={_.isEmpty(this.props.howtoHits) ? HOWTO_ITEM_TYPE.HOWTO : HOWTO_ITEM_TYPE.HOWTO_HIT}
							title="Howtos"
							items={_.isEmpty(this.props.howtoHits) ? selectedCategory.howtoList : _.extend({}, this.props.howtoHits)}
							selectedHowto={selectedHowto}
							renderHowto={renderHowto}
						/>
					</Col>

					{/*Content*/}
					<Col md="9" className="right-col">
						{renderHowtoContentElement()}
					</Col>

				</Row>
			)
		};

		return (
			<div>
				<HowToBreadcrumb
					categoryNames={this.props.categoryNames}
					rootFlag={this.props.rootCategorySelectedFlag}
					renderCategory={renderCategory}
				/>

				{renderMainContentElement()}
			</div>
		)
	}
}

// import PropTypes from 'prop-types';
// HowToBrowser.propTypes = {

//   howtoRequest: PropTypes.shape({
// 	fullPath: PropTypes.string,
// 	folderPath: PropTypes.string,
// 	categoryNames: PropTypes.array,
// 	selectedHowtoName: PropTypes.string,
// 	howtoSelectedFlag: PropTypes.bool,
// 	rootCategorySelectedFlag: PropTypes.bool
//   }),

//   // filled by data from service
//   selectedCategory: PropTypes.object,
//   selectedHowto: PropTypes.object,
//   renderCategory: PropTypes.func,
//   renderHowto: PropTypes.func
// }

export default HowToBrowser