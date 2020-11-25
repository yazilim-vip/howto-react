import React, { useState } from 'react'

// ---------------------------
//  Internal Dependencies.
// ---------------------------
import { Category, SearchResult } from './model'
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
import {
    createSearchIndex,
    parsePathAndSetContent,
    searchArchive
} from './util'
import { Alert, Container, Row, Col, FormControl, Badge } from 'react-bootstrap'
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
    // States
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null)

    // Constants
    const searchIndex = createSearchIndex(rootCategory)
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
                    {searchResult !== null && (
                        <div className='d-inline search-result-div'>
                            <span className='mr-3'>Search Result for :</span>
                            <Badge pill variant='dark'>
                                {searchResult.query}
                            </Badge>
                        </div>
                    )}
                </Col>
                <Col md='2' sm='3' className='mb-2 mb-sm-0'>
                    <ViewModeChanger
                        viewMode={initialViewMode}
                        viewModeToggleEventHandler={viewModeToggleEventHandler}
                    />
                </Col>
                <Col md='3' sm='9'>
                    <FormControl
                        type='search'
                        placeholder='Search...'
                        aria-label='Search'
                        value={searchResult === null ? '' : searchResult.query}
                        onChange={(event) => {
                            const searchQuery = event.target.value
                            if (searchQuery) {
                                const searchResult = searchArchive(
                                    searchIndex,
                                    searchQuery
                                )
                                setSearchResult(searchResult)
                            }
                        }}
                    />
                </Col>
            </Row>

            <hr />

            <FileManager
                viewMode={initialViewMode}
                categoryList={
                    searchResult !== null
                        ? searchResult.categoryHits
                        : getFileMagnerCategoryItemList()
                }
                howToList={
                    searchResult !== null
                        ? searchResult.howtoHits
                        : getFileMagnerHowToItemList()
                }
            />
            {parsedUrl.howToFoundFlag && (
                <HowToPanel howTo={parsedUrl.parsedContent.selectedHowto} />
            )}
        </div>
    )
}
