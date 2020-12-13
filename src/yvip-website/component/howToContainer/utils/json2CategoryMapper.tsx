import { HowToArchive } from 'yvip-website/component'

export const json2CategoryMapper = (
    mockData: any
): HowToArchive.models.Category => {
    const categoryObj = JSON.parse(JSON.stringify(mockData))

    const category = new HowToArchive.models.Category()
    category.name = categoryObj.name

    const subCategoryList = categoryObj.subCategoryList
    const howtoList = categoryObj.howtoList

    Object.keys(subCategoryList).forEach((sc: any) => {
        category.addSubCategory(json2CategoryMapper(subCategoryList[sc]))
    })

    Object.keys(howtoList).forEach((ht: any) => {
        const howto = new HowToArchive.models.HowTo()
        howto.categoryList = howtoList[ht].categoryList
        howto.label = howtoList[ht].label
        howto.filePath = howtoList[ht].filePath
        howto.markdownContent = howtoList[ht].markdownContent
        category.addHowTo(howto)
    })
    return category
}
