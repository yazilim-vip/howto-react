import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './VipIcon.scss'

export const VipIcon = (props:any) => (
    <div
        className={`d-inline-block yvip-icon ${props.iconCode} ${props.className}`}
    >
        <a href={props.link} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={['fab', props.iconCode]} className='mr-3' />
        </a>
    </div>
)
