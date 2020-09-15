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
var howtoRequestParser = (fullPath) => {

    let fullPathParts = fullPath.split("/")
    let categoryNames

    let folderPath
    let selectedCategoryName
    let selectedHowtoName = null

    if (fullPath.endsWith(".howto")) {
        selectedHowtoName = fullPathParts.pop()
        folderPath = fullPath.substring(0, fullPath.lastIndexOf("/"))
        categoryNames = fullPathParts
    } else {
        folderPath = fullPath
        categoryNames = fullPathParts
    }

    let rootCategorySelectedFlag = (folderPath === "");
    if (rootCategorySelectedFlag) {
        selectedCategoryName = null
        categoryNames = []
    } else {
        folderPath = "/" + folderPath
        selectedCategoryName = categoryNames[categoryNames.length - 1]
    }

    let howtoSelectedFlag = selectedHowtoName !== null
    return {
        folderPath: folderPath
        , categoryNames: categoryNames
        , selectedCategoryName: selectedCategoryName
        , selectedHowtoName: selectedHowtoName
        , howtoSelectedFlag: howtoSelectedFlag
        , rootCategorySelectedFlag: rootCategorySelectedFlag
    }
}

export default howtoRequestParser;