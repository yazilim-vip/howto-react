import { HowToArchive } from 'yvip-website/component'

export interface ParsedContent {
    selectedCategory: HowToArchive.Category;
    selectedHowto: HowToArchive.HowTo;
    categoryHits: string[] | null;
    howtoHits: string[] | null;
}
