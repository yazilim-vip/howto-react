import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from "underscore"

const HowToFileManager = ({
	// values from mapStateToProps
	folderPath,
	isHit,
	categoryList,
	howtoList,
}) => {

	const prefix = folderPath + "/"
	const renderItem = (name, link, icon) => {
		return (
			<Col xs={4} sm={3} md={3} lg={2} className="py-4 text-center" key={link}>
				<Link to={link} className="link">
					<FontAwesomeIcon icon={icon} className="pb-1" size="4x" />
					<br />
					{name}
				</Link>
			</Col>
		)
	}

	const renderCategories = (items) => Object.keys(items).map(key => {
		let name = isHit ? items[key].name : items[key].name
		let link = isHit ? items[key].path : (prefix + items[key].name)

		return (
			renderItem(name, link, faFolder)
		)
	})


	const renderHowtos = (items) => Object.keys(items).map(key => {
		let name = isHit ? items[key].name : items[key].label
		let link = isHit ? items[key].path : (prefix + items[key].label)

		return (
			renderItem(name, link, faFile)
		)
	})

	return (
		<Container fluid>
			<Row>
				{renderCategories(categoryList)}
				{renderHowtos(howtoList)}
			</Row>
		</Container>
	)
}

const mapStateToProps = (state) => {
	const howtoReducer = state.howtoReducer
	const categoryHits = howtoReducer.categoryHits
	const howtoHits = howtoReducer.howtoHits
	const selectedCategory = howtoReducer.selectedCategory

	let categoryList = categoryHits ? _.extend({}, categoryHits) : selectedCategory.subCategoryList
	let howtoList = howtoHits ? _.extend({}, howtoHits) : selectedCategory.howtoList

	return {
		folderPath: howtoReducer.folderPath,
		isHit: howtoReducer.categoryHits || howtoReducer.howtoHits,
		categoryList: categoryList,
		howtoList: howtoList
	}
}

export default connect(mapStateToProps, null)(HowToFileManager)
