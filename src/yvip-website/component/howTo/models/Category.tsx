import { HowTo } from 'yvip-website/component'

export interface Category {
    name: string
    subCategoryList: { [s: string]: Category }
    howtoList: { [s: string]: HowTo.models.HowTo }
}
