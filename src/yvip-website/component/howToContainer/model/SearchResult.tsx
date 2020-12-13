import { HowToArchive } from 'yvip-website/component'

export interface SearchResult {
    query: string
    categoryHits: HowToArchive.models.HowToItem[] | null
    howtoHits: HowToArchive.models.HowToItem[] | null
}
