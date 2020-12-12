// ---------------------------
//  Internal Dependencies
// ---------------------------
import { HowToArchiveModule } from 'yvip-website/component'

export const createSearchIndex = (rootCategory: any): HowToArchiveModule.HowToItem[] => {
    return indexContent(rootCategory, [], '/howto')
}

const indexContent = (
    data: any,
    arr: HowToArchiveModule.HowToItem[],
    path: string
): HowToArchiveModule.HowToItem[] => {
    const howtoList = data.howtoList
    const subCategoryList = data.subCategoryList

    Object.keys(howtoList).forEach((key) => {
        const howto = howtoList[key]
        const name = howto.label
        const newPath = path + '/' + name

        const howToItem: HowToArchiveModule.HowToItem = {
            path: newPath,
            type: HowToArchiveModule.HOWTO_ITEM_TYPE.HOWTO,
            name: name.toLowerCase()
        }
        arr.push(howToItem)
    })

    Object.keys(subCategoryList).forEach((key) => {
        const subCategory = subCategoryList[key]
        const name = subCategory.name
        const newPath = path + '/' + name

        const howToItem: HowToArchiveModule.HowToItem = {
            path: newPath,
            type: HowToArchiveModule.HOWTO_ITEM_TYPE.CATEGORY,
            name: name.toLowerCase()
        }

        arr.push(howToItem)
        indexContent(subCategory, arr, newPath)
    })

    return arr
}
