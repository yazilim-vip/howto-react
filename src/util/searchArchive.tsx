import { HOWTO_ITEM_TYPE } from '../constants'
// eslint-disable-next-line no-unused-vars
import { SearchItem, SearchResult } from '../model'

export const searchArchive = (
    searchIndex: SearchItem[],
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

    const categoryHits: SearchItem[] = []
    const howtoHits: SearchItem[] = []
    hits.forEach((hit: SearchItem) => {
        if (hit.type === HOWTO_ITEM_TYPE.CATEGORY_HIT) {
            categoryHits.push(hit)
        } else if (hit.type === HOWTO_ITEM_TYPE.HOWTO_HIT) {
            howtoHits.push(hit)
        }
    })

    return {
        query: query,
        categoryHits: categoryHits,
        howtoHits: howtoHits
    }
}
