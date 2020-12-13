import { HowTo } from 'yvip-website/component'

export const searchArchive = (
    searchIndex: HowTo.models.HowToItem[],
    query: string
): HowTo.models.SearchResult => {
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

    const categoryHits: HowTo.models.HowToItem[] = []
    const howtoHits: HowTo.models.HowToItem[] = []
    hits.forEach((hit: HowTo.models.HowToItem) => {
        if (hit.type === HowTo.constants.HOWTO_ITEM_TYPE_CATEGORY) {
            categoryHits.push(hit)
        } else if (hit.type === HowTo.constants.HOWTO_ITEM_TYPE_HOWTO) {
            howtoHits.push(hit)
        }
    })

    return {
        query: query,
        categoryHits: categoryHits,
        howtoHits: howtoHits
    }
}
