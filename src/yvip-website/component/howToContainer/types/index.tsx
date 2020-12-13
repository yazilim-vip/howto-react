import { HowToArchive } from 'yvip-website/component'

export type FileManagerViewMode =
    | typeof HowToArchive.constants.HOWTO_VIEW_MODE_LIST_VIEW
    | typeof HowToArchive.constants.HOWTO_VIEW_MODE_GRID_VIEW

export type HowToItemType =
    | typeof HowToArchive.constants.HOWTO_ITEM_TYPE.HOWTO
    | typeof HowToArchive.constants.HOWTO_ITEM_TYPE.CATEGORY

// Event
export type HowToEvent = 'viewModeToggleEventHandler'

export interface HowToComponentProps {
    events: Record<HowToArchive.types.HowToEvent, (...args: any[]) => void>
}
