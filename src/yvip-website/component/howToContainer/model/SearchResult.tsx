import { HowToArchive } from 'yvip-website/component'


export interface SearchResult {
    query: string;
    categoryHits: HowToArchive.HowToItem[] | null;
    howtoHits: HowToArchive.HowToItem[] | null;
}
