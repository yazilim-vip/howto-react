import { HOWTO_ITEM_TYPE } from '../howToConstants'

export const searchArchive = (searchIndex, query, onSearchResult) => {
    if (!query) {
        return {
            query: '',
            cateogryHits: null,
            howtoHits: null
        }
        // return onSearchResult('', null, null)
    }

    const hits = searchIndex.filter((o) => o.name.includes(query.toLowerCase()))
    if (!hits) {
        return {
            query: query,
            cateogryHits: null,
            howtoHits: null
        }
    }

    const categoryHits = []
    const howtoHits = []
    hits.forEach((hit) => {
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
