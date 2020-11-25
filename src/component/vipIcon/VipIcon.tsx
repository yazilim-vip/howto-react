import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './VipIcon.scss'
import { IconName } from '@fortawesome/fontawesome-svg-core'

export interface VipIconProps {
    iconCode: IconName
    className: string | undefined
    link: string | undefined
}

export const VipIcon = ({ iconCode, className, link }: VipIconProps) => {
    const divClassName = `d-inline-block yvip-icon ${iconCode} ${className}`
    return (
        <div className={divClassName}>
            <a href={link} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={['fab', iconCode]} className='mr-3' />
            </a>
        </div>
    )
}
