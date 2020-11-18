import _ from 'underscore'

import { HOWTO_DEFAULT_VIEW_MODE } from '../howToConstants'

export const mapStateToProps = (state) => {
    const howtoReducer = state.howtoReducer

    const result = {
        folderPath: howtoReducer.folderPath,
        selectedCategory: howtoReducer.selectedCategory,
        selectedCategoryName: howtoReducer.selectedCategoryName,
        selectedHowto: howtoReducer.selectedHowto,
        selectedHowtoName: howtoReducer.selectedHowtoName,
        howtoSelectedFlag: howtoReducer.howtoSelectedFlag,
        query: howtoReducer.query,
        categoryHits: howtoReducer.categoryHits,
        howtoHits: howtoReducer.howtoHits,
        searchIndex: howtoReducer.searchIndex,

        // from HowToBreadcrumb
        categoryNames: howtoReducer.categoryNames,
        rootCategorySelectedFlag: howtoReducer.rootCategorySelectedFlag
    }

    const categoryHits = howtoReducer.categoryHits
    const howtoHits = howtoReducer.howtoHits
    const selectedCategory = howtoReducer.selectedCategory

    if (selectedCategory) {
        const categoryList = categoryHits
            ? _.extend({}, categoryHits)
            : selectedCategory.subCategoryList
        const howtoList = howtoHits
            ? _.extend({}, howtoHits)
            : selectedCategory.howtoList

        // from HowToFileManager
        // folderPath: howtoReducer.folderPath,
        result.isHit = howtoReducer.categoryHits || howtoReducer.howtoHits
        result.categoryList = categoryList
        result.howtoList = howtoList
    }
    return result
}
