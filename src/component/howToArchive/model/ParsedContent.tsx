import { HowTo } from "./HowTo";
import { Category } from "./Category";


export interface ParsedContent {
    selectedCategory: Category;
    selectedHowto: HowTo;
    categoryHits: string[] | null;
    howtoHits: string[] | null;
}
