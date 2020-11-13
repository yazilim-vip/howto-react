import { HOWTO_ITEM_TYPE } from '../howToConstants'

export const searchArchive = (searchIndex, query, onSearchResult) => {
    if (!query) {
        return onSearchResult('', null, null)
    }

    const hits = searchIndex.filter((o) => o.name.includes(query.toLowerCase()))

    if (hits) {
        const categoryHits = []
        const howtoHits = []

        hits.forEach((hit) => {
            if (hit.type === HOWTO_ITEM_TYPE.CATEGORY_HIT) {
                categoryHits.push(hit)
            } else if (hit.type === HOWTO_ITEM_TYPE.HOWTO_HIT) {
                howtoHits.push(hit)
            }
        })
        onSearchResult(query, categoryHits, howtoHits)
    } else {
        onSearchResult(query, null, null)
    }
}
