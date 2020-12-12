import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faThList } from '@fortawesome/free-solid-svg-icons'

import { TooltipElement, HowToArchiveModule } from 'yvip-website/component'

export interface ViewModeChangerProps {
    viewMode: HowToArchiveModule.FileManagerViewMode
    viewModeToggleEventHandler: () => void
}

export const ViewModeChanger = ({
    viewMode,
    viewModeToggleEventHandler
}: ViewModeChangerProps) => {
    return (
        <ButtonGroup toggle className='float-right'>
            <TooltipElement placement='bottom' tooltipElement='Grid View Mode'>
                <ToggleButton
                    type='radio'
                    variant='secondary'
                    name='radio'
                    value={
                        viewMode ===
                        HowToArchiveModule.HOWTO_VIEW_MODE_GRID_VIEW
                    }
                    checked={
                        viewMode ===
                        HowToArchiveModule.HOWTO_VIEW_MODE_GRID_VIEW
                    }
                    onChange={() => viewModeToggleEventHandler()}
                >
                    <FontAwesomeIcon icon={faTh} />
                </ToggleButton>
            </TooltipElement>
            <TooltipElement placement='bottom' tooltipElement='List View Mode'>
                <ToggleButton
                    type='radio'
                    variant='secondary'
                    name='radio'
                    value={
                        viewMode ===
                        HowToArchiveModule.HOWTO_VIEW_MODE_LIST_VIEW
                    }
                    checked={
                        viewMode ===
                        HowToArchiveModule.HOWTO_VIEW_MODE_LIST_VIEW
                    }
                    onChange={() => viewModeToggleEventHandler()}
                >
                    <FontAwesomeIcon icon={faThList} />
                </ToggleButton>
            </TooltipElement>
        </ButtonGroup>
    )
}
