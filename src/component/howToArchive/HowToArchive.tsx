import React from 'react'

// ---------------------------
//  Internal Dependencies.
// ---------------------------
import { Category } from './model'
import {
    PathBreadcrumb,
    FileManager,
    FileManagerItemType,
    HowToPanel,
    ViewModeChanger
} from './child'
import {
    FileManagerViewMode,
    HOWTO_DEFAULT_VIEW_MODE
} from './HowToArchiveConstants'

import './HowToArchive.scss'
import { parsePathAndSetContent } from './util'
import { Alert, Container, Row, Col } from 'react-bootstrap'
export interface HowToArchiveProps {
    rootCategory: Category
    requestedPath: string
    viewMode: FileManagerViewMode | undefined
    viewModeToggleEventHandler: () => void
}

export const HowToArchive = ({
    rootCategory,
    requestedPath,
    viewMode,
    viewModeToggleEventHandler
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

    //TODO: move them to util class
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
            <Row>
                <Col md='7'>
                    <PathBreadcrumb items={parsedUrl.categoryNames} />
                </Col>
                <Col md='2' sm='3' className='mb-2 mb-sm-0'>
                    <ViewModeChanger
                        viewMode={initialViewMode}
                        viewModeToggleEventHandler={viewModeToggleEventHandler}
                    />
                </Col>
                <Col md='3' sm='9'></Col>
            </Row>

            <hr />

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
