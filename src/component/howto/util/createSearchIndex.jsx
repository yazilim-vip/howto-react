// ---------------------------
//  Internal Dependencies
// ---------------------------
import { SearchItem } from '../model/SearchItem'
import { HOWTO_ITEM_TYPE } from '../howToConstants'

export const createSearchIndex = (rootCategory) => {
    return indexContent(rootCategory, [], '/howto')
}

const indexContent = (data, arr, path) => {
    const howtoList = data.howtoList
    const subCategoryList = data.subCategoryList

    Object.keys(howtoList).forEach((key) => {
        const howto = howtoList[key]
        const name = howto.label
        const newPath = path + '/' + name

        const searchItem = new SearchItem(
            newPath,
            HOWTO_ITEM_TYPE.HOWTO_HIT,
            name.toLowerCase()
        )

        arr.push(searchItem)
    })

    Object.keys(subCategoryList).forEach((key) => {
        const subCategory = subCategoryList[key]
        const name = subCategory.name
        const newPath = path + '/' + name

        const searchItem = new SearchItem(
            newPath,
            HOWTO_ITEM_TYPE.CATEGORY_HIT,
            name.toLowerCase()
        )

        arr.push(searchItem)

        indexContent(subCategory, arr, newPath)
    })

    return arr
}
