import { SearchItem } from "./SearchItem";


export interface SearchResult {
    query: string;
    categoryHits: SearchItem[] | null;
    howtoHits: SearchItem[] | null;
}
