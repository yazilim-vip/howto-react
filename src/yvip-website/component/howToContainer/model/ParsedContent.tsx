import { HowToArchive } from 'yvip-website/component'

export interface ParsedContent {
    selectedCategory: HowToArchive.models.Category
    selectedHowto: HowToArchive.models.HowTo
    categoryHits: string[] | null
    howtoHits: string[] | null
}
