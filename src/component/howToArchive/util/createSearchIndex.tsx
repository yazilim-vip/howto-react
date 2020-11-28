// ---------------------------
//  Internal Dependencies
// ---------------------------
import { HOWTO_ITEM_TYPE } from '../HowToArchiveConstants'
// eslint-disable-next-line no-unused-vars
import { HowToItem } from '../model'

export const createSearchIndex = (rootCategory: any): HowToItem[] => {
    return indexContent(rootCategory, [], '/howto')
}

const indexContent = (
    data: any,
    arr: HowToItem[],
    path: string
): HowToItem[] => {
    const howtoList = data.howtoList
    const subCategoryList = data.subCategoryList

    Object.keys(howtoList).forEach((key) => {
        const howto = howtoList[key]
        const name = howto.label
        const newPath = path + '/' + name

        const howToItem: HowToItem = {
            path: newPath,
            type: HOWTO_ITEM_TYPE.HOWTO,
            name: name.toLowerCase()
        }
        arr.push(howToItem)
    })

    Object.keys(subCategoryList).forEach((key) => {
        const subCategory = subCategoryList[key]
        const name = subCategory.name
        const newPath = path + '/' + name

        const howToItem: HowToItem = {
            path: newPath,
            type: HOWTO_ITEM_TYPE.CATEGORY,
            name: name.toLowerCase()
        }

        arr.push(howToItem)
        indexContent(subCategory, arr, newPath)
    })

    return arr
}
