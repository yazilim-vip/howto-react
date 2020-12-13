import { HowToArchive } from 'yvip-website/component'

export const searchArchive = (
    searchIndex: HowToArchive.HowToItem[],
    query: string
): HowToArchive.SearchResult => {
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

    const categoryHits: HowToArchive.HowToItem[] = []
    const howtoHits: HowToArchive.HowToItem[] = []
    hits.forEach((hit: HowToArchive.HowToItem) => {
        if (hit.type === HowToArchive.HOWTO_ITEM_TYPE.CATEGORY) {
            categoryHits.push(hit)
        } else if (hit.type === HowToArchive.HOWTO_ITEM_TYPE.HOWTO) {
            howtoHits.push(hit)
        }
    })

    return {
        query: query,
        categoryHits: categoryHits,
        howtoHits: howtoHits
    }
}
