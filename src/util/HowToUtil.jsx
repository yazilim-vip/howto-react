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
const parsePathAndSetContent = (rootCategory, fullPath) => {
    let fullPathParts = fullPath.split("/")

    let categoryNames

    let folderPath
    let selectedCategoryName
    let selectedHowtoName = null

    if (fullPath.endsWith(".howto") || fullPath.endsWith(".md")) {
        selectedHowtoName = fullPathParts.pop()
        folderPath = fullPath.substring(0, fullPath.lastIndexOf("/"))
    } else {
        folderPath = fullPath
    }

    categoryNames = fullPathParts

    let rootCategorySelectedFlag = (folderPath === "");
    if (rootCategorySelectedFlag) {
        selectedCategoryName = null
        categoryNames = []
    } else {
        selectedCategoryName = categoryNames[categoryNames.length - 1]
    }

    let howtoSelectedFlag = selectedHowtoName !== null

    return {
        folderPath: folderPath,
        categoryNames: categoryNames,
        selectedCategoryName: selectedCategoryName,
        selectedHowtoName: selectedHowtoName,
        howtoSelectedFlag: howtoSelectedFlag,
        rootCategorySelectedFlag: rootCategorySelectedFlag,
        ...setContent(rootCategory, categoryNames, rootCategorySelectedFlag, selectedHowtoName)
    }
}

const setContent = (rootCategory, categoryNames, rootCategorySelectedFlag, selectedHowtoName) => {
    let selectedCategory = rootCategory
    let selectedHowto = null

    // set selectedCategory
    if (!rootCategorySelectedFlag) {
        let tmpCategory = rootCategory

        for (let catIndex in categoryNames) {
            let cat = categoryNames[catIndex]

            if (!tmpCategory.subCategoryList[cat]) {
                tmpCategory = null
                break /// category not exists
            }

            tmpCategory = tmpCategory.subCategoryList[cat]
        }

        selectedCategory = tmpCategory
    }

    // set selectedHowto
    if (selectedHowtoName !== null && selectedCategory.howtoList.hasOwnProperty(selectedHowtoName)) {
        selectedHowto = selectedCategory.howtoList[selectedHowtoName]
    }

    return {
        selectedCategory: selectedCategory,
        selectedHowto: selectedHowto
    }
}

export { parsePathAndSetContent };