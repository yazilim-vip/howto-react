import { HOWTO_ITEM_TYPE } from '../HowToArchiveConstants'
// eslint-disable-next-line no-unused-vars
import { HowToItem, SearchResult } from '../model'

export const searchArchive = (
    searchIndex: HowToItem[],
    query: string
): SearchResult => {
    if (!query) {
        return {
            query: '',
            categoryHits: null,
            howtoHits: null
        }
    }

    const hits = searchIndex.filter((o) => o.name.includes(query.toLowerCase()))
    if (!hits) {
        return {
            query: query,
            categoryHits: null,
            howtoHits: null
        }
    }

    const categoryHits: HowToItem[] = []
    const howtoHits: HowToItem[] = []
    hits.forEach((hit: HowToItem) => {
        if (hit.type === HOWTO_ITEM_TYPE.CATEGORY) {
            categoryHits.push(hit)
        } else if (hit.type === HOWTO_ITEM_TYPE.HOWTO) {
            howtoHits.push(hit)
        }
    })

    return {
        query: query,
        categoryHits: categoryHits,
        howtoHits: howtoHits
    }
}
