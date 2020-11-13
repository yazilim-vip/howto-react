import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Link } from 'react-router-dom'
import { ListGroup, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-regular-svg-icons'

class FileManagerItem extends React.Component {
    fileManagerViewMode
    name
    link
    icon
    color

    constructor(props) {
        super(props)
        this.fileManagerViewMode = props.fileManagerViewMode
        this.name = props.name
        this.link = props.link
        this.icon = props.icon
        this.color = props.color
    }

    renderListViewModeItem = () => {
        return (
            <Link to={this.link} className='link' key={this.link}>
                <ListGroup.Item>
                    <FontAwesomeIcon
                        icon={this.icon}
                        className='mr-3'
                        color={this.color}
                    />
                    {this.name}
                </ListGroup.Item>
            </Link>
        )
    }

    renderGridiewModeItem = () => {
        return (
            <Col
                xs={4}
                sm={3}
                md={3}
                lg={2}
                className='py-4 text-center'
                key={this.link}
            >
                <Link to={this.link} className='link'>
                    <FontAwesomeIcon
                        icon={this.icon}
                        className='pb-1'
                        size='4x'
                        color={this.color}
                    />
                    <br />
                    {this.name}
                </Link>
            </Col>
        )
    }

    render = () => {
        return this.fileManagerViewMode
            ? this.renderListViewModeItem()
            : this.renderGridiewModeItem()
    }
}

export class FileManagerFolderItem extends FileManagerItem {
    constructor(props) {
        super(props)
        this.icon = faFolder
        this.color = '#50a4d4'
    }
}

export class FileManagerFileItem extends FileManagerItem {
    constructor(props) {
        super(props)
        this.icon = faFile
        this.color = '#494d52'
    }
}
