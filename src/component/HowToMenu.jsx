import React from "react";
import {ListGroup} from "react-bootstrap";

const HowToMenu = (props) => {
    const route = props.route;
    const type = props.type;
    const title = props.title;
    const items = props.items;

    const renderItem = (key) => {
        switch (type) {
            case "subcategory":
                return (
                    <ListGroup.Item key={key} href={`/howto/${route}/${items[key].name}`} action>
                            {items[key].name}
                    </ListGroup.Item>
                )
            case "content":
                return (
                    <ListGroup.Item key={key} action onClick={() => {props.onContentClick(items[key].markdownContent)}}>
                            {items[key].label}
                    </ListGroup.Item>
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
