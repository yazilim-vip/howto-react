// ---------------------------
//  Internal Dependencies
// ---------------------------
import { HowTo } from 'yvip-website/component'

export const createSearchIndex = (
    rootCategory: any
): HowTo.models.HowToItem[] => {
    return indexContent(rootCategory, [], '/howto')
}

const indexContent = (
    data: any,
    arr: HowTo.models.HowToItem[],
    path: string
): HowTo.models.HowToItem[] => {
    const howtoList = data.howtoList
    const subCategoryList = data.subCategoryList

    Object.keys(howtoList).forEach((key) => {
        const howto = howtoList[key]
        const name = howto.label
        const newPath = path + '/' + name

        const howToItem: HowTo.models.HowToItem = {
            path: newPath,
            type: HowTo.constants.HOWTO_ITEM_TYPE_HOWTO,
            name: name.toLowerCase()
        }
        arr.push(howToItem)
    })

    Object.keys(subCategoryList).forEach((key) => {
        const subCategory = subCategoryList[key]
        const name = subCategory.name
        const newPath = path + '/' + name

        const howToItem: HowTo.models.HowToItem = {
            path: newPath,
            type: HowTo.constants.HOWTO_ITEM_TYPE_CATEGORY,
            name: name.toLowerCase()
        }

        arr.push(howToItem)
        indexContent(subCategory, arr, newPath)
    })

    return arr
}
