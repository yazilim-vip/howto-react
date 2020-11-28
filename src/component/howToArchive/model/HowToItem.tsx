import { HowToItemType } from '../HowToArchiveConstants'

export interface HowToItem {
    path: string
    type: HowToItemType
    name: string
}
