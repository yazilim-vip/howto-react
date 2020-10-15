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
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { withRouter } from "react-router-dom";

const HowToBrowser = ({
	// values from mapStateToProps
	folderPath,
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
	onSearchResult,
	push
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
			return (
				<SlidingPane
					isOpen={howtoSelectedFlag}
					children={<ReactMarkdown source={selectedHowto.markdownContent} />}
					title={selectedHowto.label.replace(".howto", "")}
					width="100"
					onRequestClose={() => { push(folderPath) }}
				>
				</SlidingPane>
			)
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
				<Row>
					<Col md="9">
						<HowToBreadcrumb />
					</Col>

					<Col md="3">
						<FormControl
							className="my-1"
							type="search"
							placeholder="Search..."
							aria-label="Search"
							value={query}
							onChange={event => search(event.target.value)}
						/>
					</Col>
				</Row>

				{/*Sub Category Menu*/}
				<HowToMenu
					type={categoryHits ? HOWTO_ITEM_TYPE.CATEGORY_HIT : HOWTO_ITEM_TYPE.CATEGORY}
					items={categoryHits ? _.extend({}, categoryHits) : selectedCategory.subCategoryList}
				/>

				{/*HowTo Menu*/}
				<HowToMenu
					type={howtoHits ? HOWTO_ITEM_TYPE.HOWTO_HIT : HOWTO_ITEM_TYPE.HOWTO}
					items={howtoHits ? _.extend({}, howtoHits) : selectedCategory.howtoList}
				/>

				{/*Content*/}
				{renderHowtoContentElement()}

			</div>
		)
	}

	return renderMainContentElement()
}

const mapStateToProps = (state) => {
	const howtoReducer = state.howtoReducer

	return {
		folderPath: howtoReducer.folderPath,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HowToBrowser))