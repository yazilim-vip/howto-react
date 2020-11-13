// ---------------------------
//  Internal Dependencies
// ---------------------------
import { SearchItem } from '../model/SearchItem'
import { HOWTO_ITEM_TYPE } from '../howToConstants'

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
const parsePathAndSetContent = (rootCategory, path) => {
    const rootCategorySelectedFlag = path === '/howto'
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
        ...setContent(rootCategory, categoryNames, selectedHowtoName)
    }
}

const setContent = (rootCategory, categoryNames, selectedHowtoName) => {
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

const createSearchIndex = (rootCategory) => {
    return indexContent(rootCategory, [], '/howto')
}

const indexContent = (data, arr, path) => {
    const howtoList = data.howtoList
    const subCategoryList = data.subCategoryList

    Object.keys(howtoList).forEach((key) => {
        const howto = howtoList[key]
        const name = howto.label
        const newPath = path + '/' + name

        const searchItem = new SearchItem(
            newPath,
            HOWTO_ITEM_TYPE.HOWTO_HIT,
            name.toLowerCase()
        )

        arr.push(searchItem)
    })

    Object.keys(subCategoryList).forEach((key) => {
        const subCategory = subCategoryList[key]
        const name = subCategory.name
        const newPath = path + '/' + name

        const searchItem = new SearchItem(
            newPath,
            HOWTO_ITEM_TYPE.CATEGORY_HIT,
            name.toLowerCase()
        )

        arr.push(searchItem)

        indexContent(subCategory, arr, newPath)
    })

    return arr
}

export { parsePathAndSetContent, createSearchIndex }
