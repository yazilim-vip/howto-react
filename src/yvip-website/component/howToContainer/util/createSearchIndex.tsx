// ---------------------------
//  Internal Dependencies
// ---------------------------
import { HowToArchive } from 'yvip-website/component'

export const createSearchIndex = (rootCategory: any): HowToArchive.HowToItem[] => {
    return indexContent(rootCategory, [], '/howto')
}

const indexContent = (
    data: any,
    arr: HowToArchive.HowToItem[],
    path: string
): HowToArchive.HowToItem[] => {
    const howtoList = data.howtoList
    const subCategoryList = data.subCategoryList

    Object.keys(howtoList).forEach((key) => {
        const howto = howtoList[key]
        const name = howto.label
        const newPath = path + '/' + name

        const howToItem: HowToArchive.HowToItem = {
            path: newPath,
            type: HowToArchive.HOWTO_ITEM_TYPE.HOWTO,
            name: name.toLowerCase()
        }
        arr.push(howToItem)
    })

    Object.keys(subCategoryList).forEach((key) => {
        const subCategory = subCategoryList[key]
        const name = subCategory.name
        const newPath = path + '/' + name

        const howToItem: HowToArchive.HowToItem = {
            path: newPath,
            type: HowToArchive.HOWTO_ITEM_TYPE.CATEGORY,
            name: name.toLowerCase()
        }

        arr.push(howToItem)
        indexContent(subCategory, arr, newPath)
    })

    return arr
}
