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

export const HowToPanel = (props) => {
    const { howtoSelectedFlag, selectedHowto, onRequestClose } = props

    return (
        <SlidingPane
            className='howto-sliding-pane'
            overlayClassName='howto-sliding-pane-overlay'
            isOpen={howtoSelectedFlag}
            children={<ReactMarkdown source={selectedHowto.markdownContent} />}
            title={selectedHowto.label}
            width='100'
            from='bottom'
            closeIcon={<FontAwesomeIcon icon={faAngleDown} size='2x' />}
            onRequestClose={onRequestClose}
        />
    )
}
