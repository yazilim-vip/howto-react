import React from 'react'

// ---------------------------
//  Internal Dependencies.
// ---------------------------
import { Category } from './model'
import {
    PathBreadcrumb,
    FileManager,
    FileManagerItemType,
    HowToPanel
} from './child'
import { FileManagerViewMode, HOWTO_DEFAULT_VIEW_MODE } from '../../constants'

import './HowToArchive.scss'
import { parsePathAndSetContent } from './util'
import { Alert, Container } from 'react-bootstrap'
export interface HowToArchiveProps {
    rootCategory: Category
    requestedPath: string
    viewMode: FileManagerViewMode | undefined
}

export const HowToArchive = ({
    rootCategory,
    requestedPath,
    viewMode
}: HowToArchiveProps) => {
    // Constants
    const initialViewMode = viewMode || HOWTO_DEFAULT_VIEW_MODE
    const parsedUrl = parsePathAndSetContent(rootCategory, requestedPath)

    // Helper Methdos
    const showError = (errMsg: string | JSX.Element) => (
        <Container>
            <Alert key={1} variant='danger'>
                {errMsg}
            </Alert>
        </Container>
    )

    if (!parsedUrl.categoryFoundFlag) {
        const beutifiedPath = parsedUrl.folderPath.replace('/howto/', '')
        return showError(
            <>
                Category <b>{beutifiedPath + ' '}</b>
                not found in path.
            </>
        )
    }

    const selectedCategory = parsedUrl.parsedContent.selectedCategory
    const getFileMagnerCategoryItemList = (): Array<FileManagerItemType> => {
        const categoryList = selectedCategory.subCategoryList
        return Object.keys(categoryList).map((catName) => {
            const category = categoryList[catName]
            return {
                name: category.name,
                path: `${parsedUrl.folderPath}/${category.name}`
            }
        })
    }
    const getFileMagnerHowToItemList = (): Array<FileManagerItemType> => {
        const howToList = selectedCategory.howtoList
        return Object.keys(howToList).map((howToName) => {
            const howTo = howToList[howToName]
            return {
                name: howTo.label,
                path: `${parsedUrl.folderPath}/${howTo.label}`
            }
        })
    }

    return (
        <div>
            <PathBreadcrumb items={parsedUrl.categoryNames} />
            <FileManager
                viewMode={initialViewMode}
                categoryList={getFileMagnerCategoryItemList()}
                howToList={getFileMagnerHowToItemList()}
            />
            {parsedUrl.howToFoundFlag && (
                <HowToPanel howTo={parsedUrl.parsedContent.selectedHowto} />
            )}
        </div>
    )
}
