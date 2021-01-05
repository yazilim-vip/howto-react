import { HowTo } from 'yvip-website/component'

import { HowToEvent } from './models/HowToEvent'

export type HowToItemType =
    | typeof HowTo.constants.HOWTO_ITEM_TYPE_HOWTO
    | typeof HowTo.constants.HOWTO_ITEM_TYPE_CATEGORY

export type FileManagerViewMode =
    | typeof HowTo.constants.HOWTO_VIEW_MODE_LIST_VIEW
    | typeof HowTo.constants.HOWTO_VIEW_MODE_GRID_VIEW

export interface HowToComponentProps {
    events?: HowToEvent
}
