/**
 *
 * Example1
 * url: https://www.yazilim.vip/howto
 * fullPath = ""
 * fullPathParts = ""
 * categoryNames = null
 * folderPath = ""
 * selectedCategoryName = "howto"
 *
 * Example2
 * url: https://www.yazilim.vip/howto/linux
 * fullPath = "linux"
 * fullPathParts = ["linux"]
 * categoryNames = ["linux"]
 * folderPath = "linux"
 * selectedCategoryName = "linux"
 *
 * Example3
 * url: https://www.yazilim.vip/howto/linux/specific_distro
 * fullPath = "linux/specific_distro"
 * fullPathParts = ["linux", "specific_distro"]
 * categoryNames = ["linux", "specific_distro"]
 * folderPath = "linux/specific_distro"
 * selectedCategoryName = "specific_distro"
 *
 * Example4
 * url: http://www.yazilim.vip/howto/ide/Eclipse/eclipse-shortcuts_configuration.howto
 * fullPath = "ide/Eclipse/eclipse-shortcuts_configuration.howto"
 * fullPathParts = ["ide", "Eclipse", "eclipse-shortcuts_configuration.howto"]
 * categoryNames = ["ide, "Eclipse"]
 * folderPath = "ide/Eclipse"
 * selectedCategoryName = "Eclipse"
 * selectedHowtoName = "eclipse-shortcuts_configuration.howto"
 */
const parsePathAndSetContent = (rootCategory, path) => {
    let rootCategorySelectedFlag = (path === "/howto")
    let categoryNames = path.slice(1).split("/")
    let howtoSelectedFlag = (path.endsWith(".howto") || path.endsWith(".md"))
    let selectedHowtoName = howtoSelectedFlag ? categoryNames.pop() : null
    let selectedCategoryName = categoryNames[categoryNames.length - 1]

    return {
        folderPath: path,
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

    categoryNames.shift() // shift first category (howto)
    for (let cat of categoryNames) {
        if (!tmpCategory.subCategoryList[cat]) {
            tmpCategory = null
            break /// category not exists
        }

        tmpCategory = tmpCategory.subCategoryList[cat]
    }

    let selectedCategory = tmpCategory

    // set selectedHowto
    let selectedHowto = null

    if (selectedHowtoName &&
        selectedCategory &&
        selectedCategory.howtoList.hasOwnProperty(selectedHowtoName)) {
        selectedHowto = selectedCategory.howtoList[selectedHowtoName]
    }

    return {
        selectedCategory: selectedCategory,
        selectedHowto: selectedHowto,
        categoryHits: [],
        howtoHits: []
    }
}

export { parsePathAndSetContent };