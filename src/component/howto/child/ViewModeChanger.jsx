import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faThList } from '@fortawesome/free-solid-svg-icons'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import {
    HOWTO_VIEW_MODE_GRID_VIEW,
    HOWTO_VIEW_MODE_LIST_VIEW
} from '../howToConstants'

export const ViewModeChanger = (props) => {
    const { fileManagerViewMode, onToggle } = props

    return (
        <ButtonGroup toggle className='float-right'>
            <ToggleButton
                type='radio'
                variant='secondary'
                name='radio'
                checked={fileManagerViewMode === HOWTO_VIEW_MODE_GRID_VIEW}
                onChange={() => onToggle()}
            >
                <FontAwesomeIcon icon={faTh} />
            </ToggleButton>

            <ToggleButton
                type='radio'
                variant='secondary'
                name='radio'
                checked={fileManagerViewMode === HOWTO_VIEW_MODE_LIST_VIEW}
                onChange={() => onToggle()}
            >
                <FontAwesomeIcon icon={faThList} />
            </ToggleButton>
        </ButtonGroup>
    )
}
