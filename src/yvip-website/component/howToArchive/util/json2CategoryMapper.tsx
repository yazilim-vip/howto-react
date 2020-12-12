import { HowToArchiveModule } from 'yvip-website/component'

export const json2CategoryMapper = (mockData: any): HowToArchiveModule.Category => {
    const categoryObj = JSON.parse(JSON.stringify(mockData))

    const category = new HowToArchiveModule.Category()
    category.name = categoryObj.name

    const subCategoryList = categoryObj.subCategoryList
    const howtoList = categoryObj.howtoList

    Object.keys(subCategoryList).forEach((sc: any) => {
        category.addSubCategory(json2CategoryMapper(subCategoryList[sc]))
    })

    Object.keys(howtoList).forEach((ht: any) => {
        const howto = new HowToArchiveModule.HowTo()
        howto.categoryList = howtoList[ht].categoryList
        howto.label = howtoList[ht].label
        howto.filePath = howtoList[ht].filePath
        howto.markdownContent = howtoList[ht].markdownContent
        category.addHowTo(howto)
    })
    return category
}
