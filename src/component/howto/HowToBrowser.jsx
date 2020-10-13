import React from "react";
import HowToMenu from "./HowToMenu";
import { Col, Row, Alert, InputGroup, FormControl } from "react-bootstrap";
import _ from "underscore"
import ReactMarkdown from "react-markdown";
import HowToBreadcrumb from "./HowToBreadcrumb";
import algoliasearch from 'algoliasearch/lite';
import { connect } from "react-redux";
import HOWTO_ITEM_TYPE from '../../constants/types';
import { actionCreators } from "../../redux/actions";
import { useHistory } from 'react-router-dom';

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_READ_ONLY_SECRET)
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME)

const HowToBrowser = ({
	howtoSelectedFlag,
	selectedCategory,
	selectedHowto,
	selectedHowtoName,
	categoryNames,
	rootCategorySelectedFlag,
	folderPath,
	query,
	categoryHits,
	howtoHits,
	onSearch,

	onPathChange,
	selectHowto,
	selectCategory
}) => {

	const history = useHistory();

	const renderHowto = (selectedHowto) => {
		let categoryPath = selectedHowto.categoryList.join("/")
		let howtoLabel = selectedHowto.label;

		let prefix = (rootCategorySelectedFlag) ? "" : (categoryPath + "/")
		let newFullPath = prefix + howtoLabel

		if (selectedHowto && (Object.keys(selectedHowto).length !== 0)) {
			onPathChange(newFullPath);
			selectHowto(selectedHowto);
			history.push(process.env.REACT_APP_HOWTO_PATH + "/" + newFullPath);
		}
	}

	const renderCategory = (folderPath) => {
		onPathChange(folderPath);
		selectCategory()
		history.push(process.env.REACT_APP_HOWTO_PATH + "/" + folderPath);
	}

	const search = (query) => {
		let categoryHits = []
		let howtoHits = []

		if (_.isEmpty(query)) {
			return onSearch(query, categoryHits, howtoHits)
		}

		index
			.search(query)
			.then(res => {
				let hits = res.hits;

				if (hits) {
					hits.forEach(hit => {
						if (hit.type === HOWTO_ITEM_TYPE.CATEGORY_HIT) {
							categoryHits.push(hit);
						} else if (hit.type === HOWTO_ITEM_TYPE.HOWTO_HIT) {
							howtoHits.push(hit);
						}
					});
				}

				onSearch(query, categoryHits, howtoHits)
			})
			.catch(err => console.error(err))
	}

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
					Category <b>{folderPath}</b> not found on archive.
				</Alert>
			)
		}

		return (
			<Row>

				<Col md="3" className="border-right left-col">
					<InputGroup className="mb-3">
						<FormControl
							value={query}
							placeholder="Search..."
							aria-label="Search"
							onChange={event => search(event.target.value)}
						/>

					</InputGroup>

					{/*Sub Category Menu*/}
					<HowToMenu
						folderPath={folderPath}
						type={_.isEmpty(categoryHits) ? HOWTO_ITEM_TYPE.CATEGORY : HOWTO_ITEM_TYPE.CATEGORY_HIT}
						title="Categories"
						items={_.isEmpty(categoryHits) ? selectedCategory.subCategoryList : _.extend({}, categoryHits)}
						selectedCategory={selectedCategory}
						rootCategorySelected={rootCategorySelectedFlag}
						clearHits={() => search("")}
						renderCategory={renderCategory}
					/>

					{/*HowTo Menu*/}
					<HowToMenu
						folderPath={folderPath}
						type={_.isEmpty(howtoHits) ? HOWTO_ITEM_TYPE.HOWTO : HOWTO_ITEM_TYPE.HOWTO_HIT}
						title="Howtos"
						items={_.isEmpty(howtoHits) ? selectedCategory.howtoList : _.extend({}, howtoHits)}
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
	}

	return (
		<div>
			<HowToBreadcrumb
				categoryNames={categoryNames}
				rootFlag={rootCategorySelectedFlag}
				renderCategory={renderCategory}
			/>

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
		categoryNames: state.categoryNames,
		folderPath: state.folderPath,

		query: state.query,
		categoryHits: state.categoryHits,
		howtoHits: state.howtoHits
	}
}

const mapDispatchToProps = actionCreators

export default connect(mapStateToProps, mapDispatchToProps)(HowToBrowser)