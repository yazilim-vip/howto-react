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
//  Project Dependencies
// ---------------------------
import { HowTo } from 'yvip-website/component'

export interface HowToPanelProps {
    howTo: HowTo.models.HowTo
}
export const HowToPanel = ({ howTo }: HowToPanelProps) => {
    const folderLink =
        howTo.categoryList.length === 0
            ? '/howto'
            : `/howto/${howTo.categoryList.join('/')}`
    const title = (
        <div>
            <HowTo.childs.PathBreadcrumb
                items={[...howTo.categoryList, howTo.label]}
            />
        </div>
    )
    return (
        <SlidingPane
            className='howto-sliding-pane'
            overlayClassName='howto-sliding-pane-overlay'
            isOpen
            children={<ReactMarkdown source={howTo.markdownContent} />}
            title={title}
            width='100'
            from='bottom'
            closeIcon={
                <Link to={folderLink} className='link'>
                    <FontAwesomeIcon icon={faAngleDown} size='2x' />
                </Link>
            }
            onRequestClose={() => {}}
        />
    )
}
