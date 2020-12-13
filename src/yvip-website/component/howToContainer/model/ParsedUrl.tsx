import { HowToArchive } from 'yvip-website/component'


export interface ParsedUrl {
    folderPath: string;
    categoryNames: string[];
    selectedCategoryName: string;
    selectedHowtoName: string | null | undefined;
    howtoSelectedFlag: boolean;
    rootCategorySelectedFlag: boolean;
    parsedContent: HowToArchive.ParsedContent;
    categoryFoundFlag: boolean;
    howToFoundFlag: boolean;
    howToNotFoundFlag: boolean;
}
