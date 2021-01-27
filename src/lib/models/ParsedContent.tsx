import { Category } from '../models/Category'
import { HowTo } from '../models/HowTo'

export interface ParsedContent {
    selectedCategory: Category | undefined
    selectedHowto: HowTo | undefined
    categoryHits: string[] | undefined
    howtoHits: string[] | undefined
}
