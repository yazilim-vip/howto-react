import { HowToArchive } from 'yvip-website/component'

export const searchArchive = (
    searchIndex: HowToArchive.models.HowToItem[],
    query: string
): HowToArchive.models.SearchResult => {
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

    const categoryHits: HowToArchive.models.HowToItem[] = []
    const howtoHits: HowToArchive.models.HowToItem[] = []
    hits.forEach((hit: HowToArchive.models.HowToItem) => {
        if (hit.type === HowToArchive.constants.HOWTO_ITEM_TYPE.CATEGORY) {
            categoryHits.push(hit)
        } else if (hit.type === HowToArchive.constants.HOWTO_ITEM_TYPE.HOWTO) {
            howtoHits.push(hit)
        }
    })

    return {
        query: query,
        categoryHits: categoryHits,
        howtoHits: howtoHits
    }
}
