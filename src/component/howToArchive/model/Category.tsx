import { HowTo } from "./HowTo";


export class Category {
    name = '';
    subCategoryList: { [s: string]: Category; } = {};
    howtoList: { [s: string]: HowTo; } = {};

    addSubCategory(category: Category): void {
        this.subCategoryList[category.name] = category;
    }

    addHowTo(howTo: HowTo): void {
        this.howtoList[howTo.label] = howTo;
    }
}
