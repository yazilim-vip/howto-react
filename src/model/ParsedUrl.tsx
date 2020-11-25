import { ParsedContent } from "./ParsedContent";


export interface ParsedUrl {
    folderPath: string;
    categoryNames: string[];
    selectedCategoryName: string;
    selectedHowtoName: string | null | undefined;
    howtoSelectedFlag: boolean;
    rootCategorySelectedFlag: boolean;
    parsedContent: ParsedContent;
}
