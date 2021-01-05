import { HowTo } from 'yvip-website/component'

export const json2CategoryMapper = (mockData: any): HowTo.models.Category => {
    const categoryObj = JSON.parse(JSON.stringify(mockData))

    const objSubCategoryList = categoryObj.subCategoryList
    const subCategoryList: { [s: string]: HowTo.models.Category } = {}
    Object.keys(objSubCategoryList).forEach((sc: any) => {
        const subCategory = json2CategoryMapper(objSubCategoryList[sc])
        subCategoryList[subCategory.name] = subCategory
    })

    const objHowToList = categoryObj.howtoList
    const howtoList: { [s: string]: HowTo.models.HowTo } = {}
    Object.keys(objHowToList).forEach((ht: any) => {
        const howTo: HowTo.models.HowTo = {
            categoryList: objHowToList[ht].categoryList,
            label: objHowToList[ht].label,
            filePath: objHowToList[ht].filePath,
            markdownContent: objHowToList[ht].markdownContent
        }
        howtoList[howTo.label] = howTo
    })
    return {
        name: categoryObj.name,
        subCategoryList,
        howtoList
    }
}
