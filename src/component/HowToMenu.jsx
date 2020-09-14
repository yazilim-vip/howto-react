import React from "react";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faFolder} from "@fortawesome/free-solid-svg-icons";
import * as constants from '../constants';

const HowToMenu = (props) => {
    const folderPath = props.folderPath;
    const type = props.type;
    const title = props.title;
    const items = props.items;
    const selectedHowto = props.selectedHowto;

    const renderItem = (key) => {
        switch (type) {
            case "subcategory":
                return (
                    <ListGroup.Item key={key} href={`${constants.howtoPath}${folderPath}/${items[key].name}`} action>
                        <FontAwesomeIcon icon={faFolder} className="mr-3" />
                        {items[key].name}
                    </ListGroup.Item>
                )
            case "content":
                return (
                    <BrowserRouter key={key}>
                        <Link to={`${constants.howtoPath}${folderPath}/${items[key].label}`}>
                            <ListGroup.Item
                                onClick={() => {props.onContentClick(items[key])}}
                                action
                                id={key}
                                active={items[key] === selectedHowto}
                            >
                                <FontAwesomeIcon icon={faFile} className="mr-3" />
                                {items[key].label.replace(".howto", "")}
                            </ListGroup.Item>
                        </Link>
                    </BrowserRouter>
                )
            default:
                return (<div/>)
        }
    }

    const renderItems = Object.keys(items).map(key => {
        return (renderItem(key))
    })
    const renderTitle = <h5 className="pl-3">{title}</h5>

    return (
        <div>
            {Object.keys(items).length !== 0 ? renderTitle : null}

            <ListGroup horizontal={type==="subcategory"}>
                {items !== undefined ? renderItems : null}
            </ListGroup>

        </div>
    );
};

export default HowToMenu;
