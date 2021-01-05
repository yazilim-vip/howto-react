import React, { FC } from 'react'

import { faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'

import { HowTo } from 'yvip-website/component'
import { TooltipElement } from 'yvip-website/component/TooltipElement'

export interface ViewModeChangerProps extends HowTo.types.HowToComponentProps {
    viewMode: HowTo.types.FileManagerViewMode
}

export const ViewModeChanger: FC<ViewModeChangerProps> = ({ viewMode, events }: ViewModeChangerProps) => {
    const viewModeToggleEventHandler = events.viewModeToggleEventHandler
    return (
        <ButtonGroup toggle className="float-right">
            <TooltipElement placement="bottom" tooltipElement="Grid View Mode">
                <ToggleButton
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={viewMode === HowTo.constants.HOWTO_VIEW_MODE_GRID_VIEW}
                    checked={viewMode === HowTo.constants.HOWTO_VIEW_MODE_GRID_VIEW}
                    onChange={() => viewModeToggleEventHandler()}
                >
                    <FontAwesomeIcon icon={faTh} />
                </ToggleButton>
            </TooltipElement>
            <TooltipElement placement="bottom" tooltipElement="List View Mode">
                <ToggleButton
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={viewMode === HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW}
                    checked={viewMode === HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW}
                    onChange={() => viewModeToggleEventHandler()}
                >
                    <FontAwesomeIcon icon={faThList} />
                </ToggleButton>
            </TooltipElement>
        </ButtonGroup>
    )
}
