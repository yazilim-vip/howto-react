import { HowToArchiveModule } from 'yvip-website/component'

export const searchArchive = (
    searchIndex: HowToArchiveModule.HowToItem[],
    query: string
): HowToArchiveModule.SearchResult => {
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

    const categoryHits: HowToArchiveModule.HowToItem[] = []
    const howtoHits: HowToArchiveModule.HowToItem[] = []
    hits.forEach((hit: HowToArchiveModule.HowToItem) => {
        if (hit.type === HowToArchiveModule.HOWTO_ITEM_TYPE.CATEGORY) {
            categoryHits.push(hit)
        } else if (hit.type === HowToArchiveModule.HOWTO_ITEM_TYPE.HOWTO) {
            howtoHits.push(hit)
        }
    })

    return {
        query: query,
        categoryHits: categoryHits,
        howtoHits: howtoHits
    }
}
