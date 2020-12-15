import { HowTo } from 'yvip-website/component'

export interface ParsedUrl {
    folderPath: string
    categoryNames: string[]
    selectedCategoryName: string
    selectedHowtoName: string | null | undefined
    howtoSelectedFlag: boolean
    rootCategorySelectedFlag: boolean
    parsedContent: HowTo.models.ParsedContent
    categoryFoundFlag: boolean
    howToFoundFlag: boolean
    howToNotFoundFlag: boolean
}
