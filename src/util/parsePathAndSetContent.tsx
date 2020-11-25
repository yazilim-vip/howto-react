// eslint-disable-next-line no-unused-vars
import { ParsedContent, ParsedUrl } from '../model'

/**
 *
 * Example1
 * url: https://www.yazilim.vip/howto
 * path = "/howto"
 * categoryNames = []
 * folderPath = "howto"
 * selectedCategoryName = "howto"
 *
 * Example2
 * url: https://www.yazilim.vip/howto/linux
 * path = "linux"
 * categoryNames = ["linux"]
 * folderPath = "howto/linux"
 * selectedCategoryName = "linux"
 *
 * Example3
 * url: https://www.yazilim.vip/howto/linux/specific_distro
 * path = "/howto/linux/specific_distro"
 * categoryNames = ["linux", "specific_distro"]
 * folderPath = "howto/linux/specific_distro"
 * selectedCategoryName = "specific_distro"
 *
 * Example4
 * url: http://www.yazilim.vip/howto/ide/Eclipse/eclipse-shortcuts_configuration.howto
 * path = "/howto/ide/Eclipse/eclipse-shortcuts_configuration.howto"
 * categoryNames = ["ide, "Eclipse"]
 * folderPath = "howto/ide/Eclipse"
 * selectedCategoryName = "Eclipse"
 * selectedHowtoName = "eclipse-shortcuts_configuration.howto"
 */
export const parsePathAndSetContent = (
    rootCategory: any,
    path: string
): ParsedUrl => {
    const rootCategorySelectedFlag: boolean = path === '/howto'
    const categoryNames = path.slice(1).split('/')
    const howtoSelectedFlag = path.endsWith('.howto') || path.endsWith('.md')
    const selectedHowtoName = howtoSelectedFlag ? categoryNames.pop() : null
    const selectedCategoryName = categoryNames[categoryNames.length - 1]
    const folderPath = '/' + categoryNames.join('/')

    return {
        folderPath: folderPath,
        categoryNames: categoryNames,
        selectedCategoryName: selectedCategoryName,
        selectedHowtoName: selectedHowtoName,
        howtoSelectedFlag: howtoSelectedFlag,
        rootCategorySelectedFlag: rootCategorySelectedFlag,
        parsedContent: setContent(
            rootCategory,
            categoryNames,
            selectedHowtoName
        )
    }
}

const setContent = (
    rootCategory: any,
    categoryNames: string[],
    selectedHowtoName: string | null | undefined
): ParsedContent => {
    // set selectedCategory
    let tmpCategory = rootCategory

    categoryNames.shift() // shift first category (howto), because rootCategory is not wrapped with "howto" key
    for (const cat of categoryNames) {
        if (!tmpCategory.subCategoryList[cat]) {
            tmpCategory = null
            break /// category not exists
        }

        tmpCategory = tmpCategory.subCategoryList[cat]
    }

    const selectedCategory = tmpCategory

    // set selectedHowto
    let selectedHowto = null

    if (
        selectedHowtoName &&
        selectedCategory &&
        //! eslint gives error
        // eslint-disable-next-line no-prototype-builtins
        selectedCategory.howtoList.hasOwnProperty(selectedHowtoName)
    ) {
        selectedHowto = selectedCategory.howtoList[selectedHowtoName]
    }

    return {
        selectedCategory: selectedCategory,
        selectedHowto: selectedHowto,
        categoryHits: null,
        howtoHits: null
    }
}
