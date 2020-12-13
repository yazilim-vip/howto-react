import { HowTo } from 'yvip-website/component'

export class Category {
    name = ''
    subCategoryList: { [s: string]: Category } = {}
    howtoList: { [s: string]: HowTo.models.HowTo } = {}

    addSubCategory(category: Category): void {
        this.subCategoryList[category.name] = category
    }

    addHowTo(howTo: HowTo.models.HowTo): void {
        this.howtoList[howTo.label] = howTo
    }
}
