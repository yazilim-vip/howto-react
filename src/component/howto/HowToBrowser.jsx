import React from "react";
import HowToMenu from "./HowToMenu";
import { Col, Row, Alert, FormControl } from "react-bootstrap";
import _ from "underscore"
import ReactMarkdown from "react-markdown";
import HowToBreadcrumb from "./HowToBreadcrumb";
import { connect } from "react-redux";
import { actionCreators } from "../../redux/actions";
import HOWTO_ITEM_TYPE from '../../model/HowToItemType';
import { push } from 'connected-react-router'

const HowToBrowser = ({
	// values from mapStateToProps
	selectedCategory,
	selectedCategoryName,
	selectedHowto,
	selectedHowtoName,
	categoryHits,
	howtoHits,
	howtoSelectedFlag,
	searchIndex,
	query,

	// methods from props
	onSearchResult
}) => {

	const search = (query) => {
		if (_.isEmpty(query)) {
			return onSearchResult("", null, null)
		}

		let hits = searchIndex.filter(o => o.name.includes(query.toLowerCase()))

		if (hits) {
			let categoryHits = []
			let howtoHits = []

			hits.forEach(hit => {
				if (hit.type === HOWTO_ITEM_TYPE.CATEGORY_HIT) {
					categoryHits.push(hit);
				} else if (hit.type === HOWTO_ITEM_TYPE.HOWTO_HIT) {
					howtoHits.push(hit);
				}
			});

			onSearchResult(query, categoryHits, howtoHits)
		} else {
			onSearchResult(query, null, null)
		}
	}

	const renderHowtoContentElement = () => {
		if (selectedHowto) {
			return <ReactMarkdown source={selectedHowto.markdownContent} />
		}

		if (howtoSelectedFlag) {
			return (
				<Alert key={1} variant={"danger"}>
					<b>{selectedHowtoName}</b> not found in <b>{selectedCategory.name}</b> folder.
				</Alert>
			)
		}
	};

	const renderMainContentElement = () => {
		if (selectedCategory === null) {
			return (
				<Alert key={1} variant={"danger"}>
					Category <b>{selectedCategoryName}</b> not found in path.
				</Alert>
			)
		}

		return (
			<div>
				<HowToBreadcrumb />
				<hr />

				<Row>
					<Col md="3" className="border-right left-col">

						<FormControl
							className="my-1"
							type="search"
							placeholder="Search..."
							aria-label="Search"
							value={query}
							onChange={event => search(event.target.value)}
						/>

						{/*Sub Category Menu*/}
						<HowToMenu
							title="Categories"
							type={categoryHits ? HOWTO_ITEM_TYPE.CATEGORY_HIT : HOWTO_ITEM_TYPE.CATEGORY}
							items={categoryHits ? _.extend({}, categoryHits) : selectedCategory.subCategoryList}
						/>

						{/*HowTo Menu*/}
						<HowToMenu
							title="Howtos"
							type={howtoHits ? HOWTO_ITEM_TYPE.HOWTO_HIT : HOWTO_ITEM_TYPE.HOWTO}
							items={howtoHits ? _.extend({}, howtoHits) : selectedCategory.howtoList}
						/>
					</Col>

					{/*Content*/}
					<Col md="9" className="right-col">
						{renderHowtoContentElement()}
					</Col>
				</Row>
			</div>
		)
	}

	return renderMainContentElement()
}

const mapStateToProps = (state) => {
	const howtoReducer = state.howtoReducer

	return {
		selectedCategory: howtoReducer.selectedCategory,
		selectedCategoryName: howtoReducer.selectedCategoryName,
		selectedHowto: howtoReducer.selectedHowto,
		selectedHowtoName: howtoReducer.selectedHowtoName,
		howtoSelectedFlag: howtoReducer.howtoSelectedFlag,
		query: howtoReducer.query,
		categoryHits: howtoReducer.categoryHits,
		howtoHits: howtoReducer.howtoHits,
		searchIndex: howtoReducer.searchIndex
	}
}

const mapDispatchToProps = { ...actionCreators, push }

export default connect(mapStateToProps, mapDispatchToProps)(HowToBrowser)