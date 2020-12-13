import { HowToArchiveModule } from 'yvip-website/component'

export type FileManagerViewMode =
    | typeof HowToArchiveModule.HOWTO_VIEW_MODE_LIST_VIEW
    | typeof HowToArchiveModule.HOWTO_VIEW_MODE_GRID_VIEW

export type HowToItemType =
    | typeof HowToArchiveModule.HOWTO_ITEM_TYPE.HOWTO
    | typeof HowToArchiveModule.HOWTO_ITEM_TYPE.CATEGORY

// Event
export type HowToEvent = 'viewModeToggleEventHandler'

export interface HowToComponentProps {
    events: Record<HowToArchiveModule.HowToEvent, (...args: any[]) => void>
}