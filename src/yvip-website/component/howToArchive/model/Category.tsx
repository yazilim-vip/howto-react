import { HowToArchiveModule } from 'yvip-website/component'


export class Category {
    name = '';
    subCategoryList: { [s: string]: Category; } = {};
    howtoList: { [s: string]: HowToArchiveModule.HowTo; } = {};

    addSubCategory(category: Category): void {
        this.subCategoryList[category.name] = category;
    }

    addHowTo(howTo: HowToArchiveModule.HowTo): void {
        this.howtoList[howTo.label] = howTo;
    }
}
