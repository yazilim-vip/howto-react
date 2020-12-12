import { HowToArchiveModule } from 'yvip-website/component'


export interface SearchResult {
    query: string;
    categoryHits: HowToArchiveModule.HowToItem[] | null;
    howtoHits: HowToArchiveModule.HowToItem[] | null;
}
