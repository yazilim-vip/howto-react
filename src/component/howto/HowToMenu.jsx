import React from 'react';
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HowToMenu = ({
	// values from props
	isHit, // main or howto

	categoryList,
	howtoList,

	// values from mapStateToProps
	folderPath,
	selectedCategory,
	selectedHowto
}) => {

	const prefix = folderPath + "/"
	const renderItem = (name, link, icon, active) => {

		return (
			<Link to={link} key={link}>
				<ListGroup.Item active={active}>
					<FontAwesomeIcon icon={icon} className="mr-3" />
					{name}
				</ListGroup.Item>
			</Link>
		)
	}

	const renderCategories = (items) => Object.keys(items).map(key => {
		let name = items[key].name
		let link = isHit ? items[key].path : (prefix + items[key].name)
		let active = selectedCategory === items[key]

		return (
			renderItem(name, link, faFolder, active)
		)
	})


	const renderHowtos = (items) => Object.keys(items).map(key => {
		let name = items[key].label.replace(".howto", "").replace(".md", "")
		let link = isHit ? items[key].path : (prefix + items[key].label)
		let active = selectedHowto === items[key]

		return (
			renderItem(name, link, faFile, active)
		)
	})

	return (
		<ListGroup>
			{renderCategories(categoryList)}
			{renderHowtos(howtoList)}
		</ListGroup>
	)
}

const mapStateToProps = (state) => {
	const howtoReducer = state.howtoReducer

	return {
		folderPath: howtoReducer.folderPath,
		selectedCategory: howtoReducer.selectedCategory,
		selectedHowto: howtoReducer.selectedHowto
	}
}

export default connect(mapStateToProps, null)(HowToMenu)
