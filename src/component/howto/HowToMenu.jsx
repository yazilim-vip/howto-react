import React from 'react';
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import _ from 'underscore';
import HOWTO_ITEM_TYPE from '../../constants/types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HowToMenu = ({
	// values from props
	type,
	title,
	items,

	// values from mapStateToProps
	folderPath,
	selectedCategory,
	selectedHowto,
	rootCategorySelectedFlag
}) => {

	const prefix = (rootCategorySelectedFlag ? "" : (folderPath + "/"))

	const renderItem = (key) => {

		switch (type) {
			// DEFAULT TYPES
			case HOWTO_ITEM_TYPE.CATEGORY:
				return (
					<Link to={prefix + items[key].name} replace key={key}>
						<ListGroup.Item
							action
							active={items[key] === selectedCategory}
						>
							<FontAwesomeIcon icon={faFolder} className="mr-3" />
							{items[key].name}
						</ListGroup.Item>
					</Link>
				)
			case HOWTO_ITEM_TYPE.HOWTO:
				return (
					<Link to={prefix + items[key].label} replace key={key}>
						<ListGroup.Item
							action
							active={items[key] === selectedHowto}
						>
							<FontAwesomeIcon icon={faFile} className="mr-3" />
							{items[key].label.replace(".howto", "")}
						</ListGroup.Item>
					</Link>
				)

			// HIT TYPES
			case HOWTO_ITEM_TYPE.CATEGORY_HIT:
				return (
					<Link to={items[key].objectID} replace key={key}>
						<ListGroup.Item
							action
							active={items[key].obj === selectedCategory}
						>
							<FontAwesomeIcon icon={faFolder} className="mr-3" />
							{items[key].name}
						</ListGroup.Item>
					</Link>
				)
			case HOWTO_ITEM_TYPE.HOWTO_HIT:
				return (
					<Link to={items[key].objectID} replace key={key}>
						<ListGroup.Item
							action
							active={items[key].obj === selectedHowto}
						>
							<FontAwesomeIcon icon={faFile} className="mr-3" />
							{items[key].name}
						</ListGroup.Item>
					</Link>
				)

			default:
				return (<div />)
		}
	}

	const renderItems = Object.keys(items).map(key => { return (renderItem(key)) })

	const renderTitle = <div>
		<hr />
		<h5 className="pl-3">{title}</h5>
	</div>

	return (
		<div>
			{Object.keys(items).length !== 0 ? renderTitle : null}

			<ListGroup>
				{items !== undefined && !_.isEmpty(items) ? renderItems : null}
			</ListGroup>

		</div>
	);
};

const mapStateToProps = (state) => {
	const howtoReducer = state.howtoReducer

	return {
		folderPath: howtoReducer.folderPath,
		selectedCategory: howtoReducer.selectedCategory,
		selectedHowto: howtoReducer.selectedHowto,
		rootCategorySelectedFlag: howtoReducer.rootCategorySelectedFlag
	}
}

export default connect(mapStateToProps, null)(HowToMenu)
