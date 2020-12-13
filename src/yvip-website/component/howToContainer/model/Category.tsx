import { HowToArchive } from 'yvip-website/component'


export class Category {
    name = '';
    subCategoryList: { [s: string]: Category; } = {};
    howtoList: { [s: string]: HowToArchive.HowTo; } = {};

    addSubCategory(category: Category): void {
        this.subCategoryList[category.name] = category;
    }

    addHowTo(howTo: HowToArchive.HowTo): void {
        this.howtoList[howTo.label] = howTo;
    }
}
