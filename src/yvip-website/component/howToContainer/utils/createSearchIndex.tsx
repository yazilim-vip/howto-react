// ---------------------------
//  Internal Dependencies
// ---------------------------
import { HowToArchive } from 'yvip-website/component'

export const createSearchIndex = (
    rootCategory: any
): HowToArchive.models.HowToItem[] => {
    return indexContent(rootCategory, [], '/howto')
}

const indexContent = (
    data: any,
    arr: HowToArchive.models.HowToItem[],
    path: string
): HowToArchive.models.HowToItem[] => {
    const howtoList = data.howtoList
    const subCategoryList = data.subCategoryList

    Object.keys(howtoList).forEach((key) => {
        const howto = howtoList[key]
        const name = howto.label
        const newPath = path + '/' + name

        const howToItem: HowToArchive.models.HowToItem = {
            path: newPath,
            type: HowToArchive.constants.HOWTO_ITEM_TYPE.HOWTO,
            name: name.toLowerCase()
        }
        arr.push(howToItem)
    })

    Object.keys(subCategoryList).forEach((key) => {
        const subCategory = subCategoryList[key]
        const name = subCategory.name
        const newPath = path + '/' + name

        const howToItem: HowToArchive.models.HowToItem = {
            path: newPath,
            type: HowToArchive.constants.HOWTO_ITEM_TYPE.CATEGORY,
            name: name.toLowerCase()
        }

        arr.push(howToItem)
        indexContent(subCategory, arr, newPath)
    })

    return arr
}
