export const HOWTO_VIEW_MODE_LIST_VIEW = 'list-view'
export const HOWTO_VIEW_MODE_GRID_VIEW = 'grid-view'
export type FileManagerViewMode =
| typeof HOWTO_VIEW_MODE_LIST_VIEW
| typeof HOWTO_VIEW_MODE_GRID_VIEW
export const HOWTO_DEFAULT_VIEW_MODE: FileManagerViewMode = HOWTO_VIEW_MODE_GRID_VIEW

export const HOWTO_ITEM_TYPE = {
    HOWTO: 'howto',
    CATEGORY: 'category',
    HOWTO_HIT: 'howto_hit',
    CATEGORY_HIT: 'category_hit'
}
