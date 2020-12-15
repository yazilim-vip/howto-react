import { HowTo } from 'yvip-website/component'

export interface ParsedContent {
    selectedCategory: HowTo.models.Category
    selectedHowto: HowTo.models.HowTo
    categoryHits: string[] | null
    howtoHits: string[] | null
}
