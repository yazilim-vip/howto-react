import React, { useState } from 'react'

// ---------------------------
//  External Dependencies.
// ---------------------------
import { Link } from 'react-router-dom'
import { Alert, Container, Row, Col, FormControl, Badge } from 'react-bootstrap'

// ---------------------------
//  Project Dependencies
// ---------------------------
import { HowTo } from 'yvip-website/component'

// ---------------------------
//  Module Internal Dependencies
// ---------------------------
import 'yvip-website/component/howTo/HowToContainer.scss'
import ReactMarkdown from 'react-markdown'

export interface HowToContainerProps {
    rootCategory: HowTo.models.Category
    requestedPath: string
    viewMode: HowTo.types.FileManagerViewMode | undefined
    events: Record<HowTo.types.HowToEvent, (...args: any[]) => void>
}

export const HowToContainer = ({
    rootCategory,
    requestedPath,
    viewMode,
    events
}: HowToContainerProps) => {
    // States
    const [
        searchResult,
        setSearchResult
    ] = useState<HowTo.models.SearchResult | null>(null)

    // Constants
    const searchIndex = HowTo.utils.createSearchIndex(rootCategory)
    const initialViewMode = viewMode || HowTo.constants.HOWTO_DEFAULT_VIEW_MODE
    const parsedUrl = HowTo.utils.parsePathAndSetContent(
        rootCategory,
        requestedPath
    )

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
                <br />
                <Link to='/howto'>Go to root directory</Link>
            </>
        )
    }

    const selectedCategory = parsedUrl.parsedContent.selectedCategory

    //TODO: move them to util class
    const getFileMagnerCategoryItemList = (): Array<HowTo.models.HowToItem> => {
        const categoryList = selectedCategory.subCategoryList
        return Object.keys(categoryList).map((catName) => {
            const category = categoryList[catName]
            return {
                name: category.name,
                path: `${parsedUrl.folderPath}/${category.name}`,
                type: HowTo.constants.HOWTO_ITEM_TYPE_CATEGORY
            }
        })
    }
    const getFileMagnerHowToItemList = (): Array<HowTo.models.HowToItem> => {
        const howToList = selectedCategory.howtoList
        return Object.keys(howToList).map((howToName) => {
            const howTo = howToList[howToName]
            return {
                name: howTo.label,
                path: `${parsedUrl.folderPath}/${howTo.label}`,
                type: HowTo.constants.HOWTO_ITEM_TYPE_HOWTO
            }
        })
    }

    const pathBreadcrumElements = parsedUrl.categoryNames
    if (parsedUrl.selectedHowtoName) {
        pathBreadcrumElements.push(parsedUrl.selectedHowtoName)
    }

    return (
        <div>
            <Row>
                <Col md='7'>
                    <HowTo.childs.PathBreadcrumb
                        items={pathBreadcrumElements}
                    />
                    {searchResult !== null && (
                        <div className='search-result-div'>
                            <span className='mr-3'>Search Result for :</span>
                            <Badge pill variant='dark'>
                                {searchResult.query}
                            </Badge>
                        </div>
                    )}
                </Col>
                <Col md='2' sm='3' className='mb-2 mb-sm-0'>
                    <div className='d-flex bd-highlight mb-3'>
                        <div className='ml-auto mr-4'></div>

                        {!parsedUrl.howtoSelectedFlag && (
                            <HowTo.childs.ViewModeChanger
                                viewMode={initialViewMode}
                                events={events}
                            />
                        )}
                    </div>
                </Col>
                <Col md='3' sm='9'>
                    <FormControl
                        type='search'
                        placeholder='Search...'
                        aria-label='Search'
                        value={searchResult ? searchResult.query : ''}
                        onChange={(event) => {
                            const searchQuery = event.target.value
                            if (searchQuery) {
                                const searchResult = HowTo.utils.searchArchive(
                                    searchIndex,
                                    searchQuery
                                )
                                setSearchResult(searchResult)
                            } else {
                                setSearchResult(null)
                            }
                        }}
                    />
                </Col>
            </Row>
            <hr />
            {searchResult === null && parsedUrl.howToNotFoundFlag && (
                <Alert key={1} variant='danger'>
                    <b>Whopps {parsedUrl.selectedHowtoName}</b> not found in{' '}
                    <b>{selectedCategory.name}</b> folder.
                    <br />
                    <Link to={parsedUrl.folderPath}>
                        Go to {selectedCategory.name} category
                    </Link>
                </Alert>
            )}

            {searchResult === null && parsedUrl.howToFoundFlag ? (
                <ReactMarkdown
                    source={
                        parsedUrl.parsedContent.selectedHowto.markdownContent
                    }
                />
            ) : (
                <HowTo.childs.FileManager
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
            )}
        </div>
    )
}
