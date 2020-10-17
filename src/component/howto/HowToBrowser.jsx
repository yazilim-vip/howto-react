import React from "react";
import HowToFileManager from "./HowToFileManager";
import { Col, Row, Alert, FormControl, ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import HowToBreadcrumb from "./HowToBreadcrumb";
import { connect } from "react-redux";
import { actionCreators } from "../../redux/actions";
import HOWTO_ITEM_TYPE from '../../model/HowToItemType';
import { push } from 'connected-react-router'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faList, faFolder } from "@fortawesome/free-solid-svg-icons";

const HowToBrowser = ({
	// values from mapStateToProps
	folderPath,
	selectedCategory,
	selectedCategoryName,
	selectedHowto,
	selectedHowtoName,
	howtoSelectedFlag,
	searchIndex,
	query,

	// methods from props
	onSearchResult,
	push
}) => {

	const search = (query) => {
		if (!query) {
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
					className="howto-sliding-pane"
					isOpen={howtoSelectedFlag}
					children={<ReactMarkdown source={selectedHowto.markdownContent} />}
					title={selectedHowto.label}
					width="100"
					from="bottom"
					closeIcon={<FontAwesomeIcon icon={faAngleDown} size="2x" />}
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
		if (!selectedCategory) {
			return (
				<Alert key={1} variant={"danger"}>
					Category <b>{selectedCategoryName}</b> not found in path.
				</Alert>
			)
		}

		return (
			<div>
				<Row>
					<Col md="7">
						<HowToBreadcrumb />
					</Col>

					<Col md="2" sm="3" className="mb-2 mb-sm-0">
						<ButtonGroup toggle className="float-right">
							<ToggleButton
								type="radio"
								variant="secondary"
								name="radio"
								value={1}
							// checked={radioValue === radio.value}
							// onChange={(e) => setRadioValue(e.currentTarget.value)}
							>
								<FontAwesomeIcon icon={faFolder} />

							</ToggleButton>

							<ToggleButton
								type="radio"
								variant="secondary"
								name="radio"
								value={2}
							// checked={radioValue === radio.value}
							// onChange={(e) => setRadioValue(e.currentTarget.value)}
							>
								<FontAwesomeIcon icon={faList} />
							</ToggleButton>
						</ButtonGroup>
					</Col>

					<Col md="3" sm="9">

						{/* <div className="mr-3 mt-2 align-items-center">
							<Switch />
						</div> */}

						<FormControl
							type="search"
							placeholder="Search..."
							aria-label="Search"
							value={query}
							onChange={event => search(event.target.value)} />
					</Col>
				</Row>

				<hr />

				<HowToFileManager />

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

export default connect(mapStateToProps, mapDispatchToProps)(HowToBrowser)