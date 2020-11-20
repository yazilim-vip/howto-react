import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Link } from 'react-router-dom'
import SlidingPane from 'react-sliding-pane'
import ReactMarkdown from 'react-markdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { HowToBreadcrumb } from './Breadcrumb'

export const HowToPanel = (props) => {
    const {
        howtoSelectedFlag,
        selectedHowto,
        folderPath,
        rootCategorySelectedFlag
    } = props

    const title = (
        <>
            <HowToBreadcrumb
                howTo={selectedHowto}
                rootCategorySelectedFlag={rootCategorySelectedFlag}
            />
        </>
    )
    return (
        <SlidingPane
            className='howto-sliding-pane'
            overlayClassName='howto-sliding-pane-overlay'
            isOpen={howtoSelectedFlag}
            children={<ReactMarkdown source={selectedHowto.markdownContent} />}
            title={title}
            width='100'
            from='bottom'
            closeIcon={
                <Link to={folderPath} className='link'>
                    <FontAwesomeIcon icon={faAngleDown} size='2x' />
                </Link>
            }
        />
    )
}
