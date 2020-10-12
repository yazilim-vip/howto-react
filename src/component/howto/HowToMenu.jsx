import React from 'react';
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import _ from 'underscore';
import HOWTO_ITEM_TYPE from '../../constants/types';

const HowToMenu = (props) => {
	const folderPath = props.folderPath;
	const type = props.type;
	const title = props.title;
	const items = props.items;
	const selectedHowto = props.selectedHowto;
	const selectedCategory = props.selectedCategory;
	const rootCategorySelected = props.rootCategorySelected;

	const renderCategory = props.renderCategory;
	const renderHowto = props.renderHowto;

	const clearHits = props.clearHits;

	const renderItem = (key) => {
		let prefix = (rootCategorySelected ? "" : (folderPath + "/"))

		switch (type) {
			// DEFAULT TYPES
			case HOWTO_ITEM_TYPE.CATEGORY:
				return (
					<ListGroup.Item
						key={key}
						action
						onClick={() => {
							renderCategory(prefix + items[key].name, items[key])
							//   renderCategory(items[key].name, items[key])
						}}
						active={items[key] === selectedCategory}
					>
						<FontAwesomeIcon icon={faFolder} className="mr-3" />
						{items[key].name}
					</ListGroup.Item>
				)
			case HOWTO_ITEM_TYPE.HOWTO:
				return (
					<ListGroup.Item
						key={key}
						action
						onClick={() => {
							renderHowto(items[key])
						}}
						active={items[key] === selectedHowto}
					>
						<FontAwesomeIcon icon={faFile} className="mr-3" />
						{items[key].label.replace(".howto", "")}
					</ListGroup.Item>
				)

			// HIT TYPES
			case HOWTO_ITEM_TYPE.CATEGORY_HIT:
				return (
					<ListGroup.Item
						key={key}
						action
						onClick={() => {
							clearHits()
							renderCategory(items[key].objectID, items[key])
						}}
						active={items[key].obj === selectedCategory}
					>
						<FontAwesomeIcon icon={faFolder} className="mr-3" />
						{items[key].name}
					</ListGroup.Item>
				)
			case HOWTO_ITEM_TYPE.HOWTO_HIT:
				return (
					<ListGroup.Item
						key={key}
						action
						onClick={() => {
							renderHowto(items[key].obj)
						}}
						active={items[key].obj === selectedHowto}
					>
						<FontAwesomeIcon icon={faFile} className="mr-3" />
						{items[key].name}
					</ListGroup.Item>
				)

			default:
				return (<div />)
		}
	}

	const renderItems = Object.keys(items).map(key => {
		return (renderItem(key))
	})
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

export default HowToMenu;
