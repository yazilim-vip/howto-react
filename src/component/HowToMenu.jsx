import React from 'react';
import PropTypes from 'prop-types';

import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import * as constants from '../constants';


const HowToMenu = (props) => {
    const folderPath = props.folderPath;
    const type = props.type;
    const title = props.title;
    const items = props.items;
    const selectedHowto = props.selectedHowto;
    const selectedCategory = props.selectedCategory;
    const rootCategorySelected = props.rootCategorySelected;


    const renderItem = (key) => {
        let prefix = (rootCategorySelected ? "" : (folderPath + "/"))
        switch (type) {
            case "subcategory":
                return (
                    <BrowserRouter key={key}>
                        <Link to={constants.HOWTO_PATH +folderPath + "/" + items[key].name}>
                            <ListGroup.Item
                                key={key}
                                action
                                onClick={() => { props.onCategoryClick(prefix + items[key].name) }}
                                active={items[key] === selectedCategory}
                            >
                                <FontAwesomeIcon icon={faFolder} className="mr-3" />
                                {items[key].name}
                            </ListGroup.Item>
                        </Link>
                    </BrowserRouter>
                )
            case "content":
                return (
                    <BrowserRouter key={key}>
                        <Link to={`${constants.HOWTO_PATH}${folderPath}/${items[key].label}`}>
                            <ListGroup.Item
                                id={key}
                                action
                                onClick={() => { props.onContentClick(items[key]) }}
                                active={items[key] === selectedHowto}
                            >
                                <FontAwesomeIcon icon={faFile} className="mr-3" />
                                {items[key].label.replace(".howto", "")}
                            </ListGroup.Item>
                        </Link>
                    </BrowserRouter>
                )
            default:
                return (<div />)
        }
    }

    const renderItems = Object.keys(items).map(key => {
        return (renderItem(key))
    })
    const renderTitle = <h5 className="pl-3">{title}</h5>

    return (
        <div>
            {Object.keys(items).length !== 0 ? renderTitle : null}

            <ListGroup horizontal={type === "subcategory"}>
                {items !== undefined ? renderItems : null}
            </ListGroup>

        </div>
    );
};


HowToMenu.propTypes = {
    folderPath: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.object,
    selectedHowto: PropTypes.object,
    onContentClick: PropTypes.func
};

export default HowToMenu;
