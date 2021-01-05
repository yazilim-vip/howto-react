import { HowTo } from 'yvip-website/component'

export interface ParsedContent {
    selectedCategory: HowTo.models.Category | undefined
    selectedHowto: HowTo.models.HowTo | undefined
    categoryHits: string[] | undefined
    howtoHits: string[] | undefined
}
