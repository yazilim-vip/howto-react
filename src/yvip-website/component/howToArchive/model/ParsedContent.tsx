import { HowToArchiveModule } from 'yvip-website/component'

export interface ParsedContent {
    selectedCategory: HowToArchiveModule.Category;
    selectedHowto: HowToArchiveModule.HowTo;
    categoryHits: string[] | null;
    howtoHits: string[] | null;
}
