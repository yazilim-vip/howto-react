export * from './FileManagerConstants'
export const HOWTO_ITEM_TYPE = {
    HOWTO: 'howto_hit',
    CATEGORY: 'category_hit'
}
export type HowToItemType =
    | typeof HOWTO_ITEM_TYPE.HOWTO
    | typeof HOWTO_ITEM_TYPE.CATEGORY
