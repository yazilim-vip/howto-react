import React from "react";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';


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
                    <ListGroup.Item key={key} href={`/howto/${folderPath}/${items[key].name}`} action>
                        {items[key].name}
                    </ListGroup.Item>
                )
            case "content":
                return (
                    <BrowserRouter key={key}>
                        <Link to={`/howto/${folderPath}/${items[key].label}`}>
                            <ListGroup.Item
                                onClick={() => {props.onContentClick(items[key])}}
                                action
                                id={key}
                                active={items[key] === selectedHowto}
                            >
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

            <ListGroup>
                {items !== undefined ? renderItems : null}
            </ListGroup>

        </div>
    );
};

export default HowToMenu;
