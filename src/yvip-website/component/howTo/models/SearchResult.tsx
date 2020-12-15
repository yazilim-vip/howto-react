import { HowTo } from 'yvip-website/component'

export interface SearchResult {
    query: string
    categoryHits: HowTo.models.HowToItem[] | null
    howtoHits: HowTo.models.HowToItem[] | null
}
