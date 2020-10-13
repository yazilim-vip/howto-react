import React from "react";
import HowToMenu from "./HowToMenu";
import { Col, Row, Alert, InputGroup, FormControl } from "react-bootstrap";
import _ from "underscore"
import ReactMarkdown from "react-markdown";
import HowToBreadcrumb from "./HowToBreadcrumb";
import algoliasearch from 'algoliasearch/lite';
import { connect } from "react-redux";
import { actionCreators } from "../../redux/actions";
import HOWTO_ITEM_TYPE from '../../constants/types';
import { useHistory } from 'react-router-dom';

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_READ_ONLY_SECRET)
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME)

const HowToBrowser = ({
	folderPath,
	selectedCategory,

	selectedHowto,
	selectedHowtoName,

	howtoSelectedFlag,

	categoryHits,
	howtoHits,
	onSearchResult,

	onPathChange
}) => {

	const history = useHistory();

	const changePath = (path) => {
		onPathChange(path);
		history.push(process.env.REACT_APP_HOWTO_PATH + "/" + path);
	}

	const search = _.debounce((query) => {
		if (_.isEmpty(query)) {
			return onSearchResult([], [])
		}

		index
			.search(query)
			.then(res => {
				let categoryHits = []
				let howtoHits = []
				let hits = res.hits

				if (hits) {
					hits.forEach(hit => {
						if (hit.type === HOWTO_ITEM_TYPE.CATEGORY_HIT) {
							categoryHits.push(hit);
						} else if (hit.type === HOWTO_ITEM_TYPE.HOWTO_HIT) {
							howtoHits.push(hit);
						}
					});
				}

				onSearchResult(categoryHits, howtoHits)
			})
			.catch(err => console.error(err))
	}, 500)

	const renderHowtoContentElement = () => {
		if (selectedHowto !== null) {
			return <ReactMarkdown source={selectedHowto.markdownContent} />
		}

		if (howtoSelectedFlag || selectedCategory.howtoList.length > 0) {
			return (
				<Alert key={1} variant={"danger"}>
					<b>{selectedHowtoName}</b> not found on <b>{selectedCategory.name}</b> folder.
				</Alert>
			)
		}
	};

	const renderMainContentElement = () => {
		if (selectedCategory === null) {
			return (
				<Alert key={1} variant={"danger"}>
					Category <b>{folderPath}</b> not found on archive.
				</Alert>
			)
		}

		return (
			<Row>

				<Col md="3" className="border-right left-col">
					<InputGroup className="mb-3">
						<FormControl
							placeholder="Search..."
							aria-label="Search"
							onChange={event => search(event.target.value)}
						/>
					</InputGroup>

					{/*Sub Category Menu*/}
					<HowToMenu
						title="Categories"
						type={_.isEmpty(categoryHits) ? HOWTO_ITEM_TYPE.CATEGORY : HOWTO_ITEM_TYPE.CATEGORY_HIT}
						items={_.isEmpty(categoryHits) ? selectedCategory.subCategoryList : _.extend({}, categoryHits)}
						changePath={changePath}
					/>

					{/*HowTo Menu*/}
					<HowToMenu
						title="Howtos"
						type={_.isEmpty(howtoHits) ? HOWTO_ITEM_TYPE.HOWTO : HOWTO_ITEM_TYPE.HOWTO_HIT}
						items={_.isEmpty(howtoHits) ? selectedCategory.howtoList : _.extend({}, howtoHits)}
						changePath={changePath}
					/>
				</Col>

				{/*Content*/}
				<Col md="9" className="right-col">
					{renderHowtoContentElement()}
				</Col>

			</Row>
		)
	}

	return (
		<div>
			<HowToBreadcrumb changePath={changePath} />
			<hr />
			{renderMainContentElement()}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		howtoSelectedFlag: state.howtoSelectedFlag,
		selectedCategory: state.selectedCategory,
		selectedHowto: state.selectedHowto,
		selectedHowtoName: state.selectedHowtoName,
		folderPath: state.folderPath,

		categoryHits: state.categoryHits,
		howtoHits: state.howtoHits
	}
}

const mapDispatchToProps = actionCreators

export default connect(mapStateToProps, mapDispatchToProps)(HowToBrowser)