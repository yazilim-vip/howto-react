import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
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
        onRequestClose,
        categoryNames,
        rootCategorySelectedFlag
    } = props

    const title = (
        <>
            <HowToBreadcrumb
                categoryNames={categoryNames}
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
            closeIcon={<FontAwesomeIcon icon={faAngleDown} size='2x' />}
            onRequestClose={onRequestClose}
        />
    )
}
