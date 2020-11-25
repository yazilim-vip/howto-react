// ---------------------------
//  Internal Dependencies
// ---------------------------
import { HOWTO_ITEM_TYPE } from '../constants'
// eslint-disable-next-line no-unused-vars
import { SearchItem } from '../model'

export const createSearchIndex = (rootCategory: any): SearchItem[] => {
    return indexContent(rootCategory, [], '/howto')
}

const indexContent = (
    data: any,
    arr: SearchItem[],
    path: string
): SearchItem[] => {
    const howtoList = data.howtoList
    const subCategoryList = data.subCategoryList

    Object.keys(howtoList).forEach((key) => {
        const howto = howtoList[key]
        const name = howto.label
        const newPath = path + '/' + name

        const searchItem: SearchItem = {
            path: newPath,
            type: HOWTO_ITEM_TYPE.HOWTO_HIT,
            name: name.toLowerCase()
        }
        arr.push(searchItem)
    })

    Object.keys(subCategoryList).forEach((key) => {
        const subCategory = subCategoryList[key]
        const name = subCategory.name
        const newPath = path + '/' + name

        const searchItem: SearchItem = {
            path: newPath,
            type: HOWTO_ITEM_TYPE.CATEGORY_HIT,
            name: name.toLowerCase()
        }

        arr.push(searchItem)
        indexContent(subCategory, arr, newPath)
    })

    return arr
}
