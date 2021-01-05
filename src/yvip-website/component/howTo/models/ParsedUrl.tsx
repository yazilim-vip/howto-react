import { HowTo } from 'yvip-website/component'

export interface ParsedUrl {
    folderPath: string
    categoryNames: string[]
    selectedCategoryName: string
    selectedHowtoName: string | undefined
    howtoSelectedFlag: boolean
    rootCategorySelectedFlag: boolean
    parsedContent: HowTo.models.ParsedContent | undefined
    categoryFoundFlag: boolean
    howToFoundFlag: boolean
}
