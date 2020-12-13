import React, { useState } from 'react'

// ---------------------------
//  External Dependencies.
// ---------------------------
import { Link } from 'react-router-dom'
import {
    Alert,
    Container,
    Row,
    Col,
    FormControl,
    Badge,
    Button
} from 'react-bootstrap'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// ---------------------------
//  Project Dependencies
// ---------------------------
import { TooltipElement, HowToArchive } from 'yvip-website/component'

// ---------------------------
//  Module Internal Dependencies
// ---------------------------
import './HowToContainer.scss'

export interface HowToContainerProps {
    rootCategory: HowToArchive.models.Category
    requestedPath: string
    viewMode: HowToArchive.types.FileManagerViewMode | undefined
    events: Record<HowToArchive.types.HowToEvent, (...args: any[]) => void>
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
    ] = useState<HowToArchive.models.SearchResult | null>(null)

    // Constants
    const searchIndex = HowToArchive.utils.createSearchIndex(rootCategory)
    const initialViewMode =
        viewMode || HowToArchive.constants.HOWTO_DEFAULT_VIEW_MODE
    const parsedUrl = HowToArchive.utils.parsePathAndSetContent(
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
    const getFileMagnerCategoryItemList = (): Array<
        HowToArchive.models.HowToItem
    > => {
        const categoryList = selectedCategory.subCategoryList
        return Object.keys(categoryList).map((catName) => {
            const category = categoryList[catName]
            return {
                name: category.name,
                path: `${parsedUrl.folderPath}/${category.name}`,
                type: HowToArchive.constants.HOWTO_ITEM_TYPE.CATEGORY
            }
        })
    }
    const getFileMagnerHowToItemList = (): Array<
        HowToArchive.models.HowToItem
    > => {
        const howToList = selectedCategory.howtoList
        return Object.keys(howToList).map((howToName) => {
            const howTo = howToList[howToName]
            return {
                name: howTo.label,
                path: `${parsedUrl.folderPath}/${howTo.label}`,
                type: HowToArchive.constants.HOWTO_ITEM_TYPE.HOWTO
            }
        })
    }

    return (
        <div>
            <Row>
                <Col md='7'>
                    <HowToArchive.childs.PathBreadcrumb
                        items={parsedUrl.categoryNames}
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
                        <div className='ml-auto mr-4'>
                            <TooltipElement
                                placement='bottom'
                                tooltipElement={
                                    <>
                                        List favorited contents <br /> (not
                                        supported yet)
                                    </>
                                }
                            >
                                <span className='d-inline-block'>
                                    <Button
                                        variant='secondary'
                                        disabled
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        <FontAwesomeIcon icon={faStar} />
                                    </Button>
                                </span>
                            </TooltipElement>
                        </div>
                        <HowToArchive.childs.ViewModeChanger
                            viewMode={initialViewMode}
                            events={events}
                        />
                    </div>
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
                                const searchResult = HowToArchive.utils.searchArchive(
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
            <HowToArchive.childs.FileManager
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
                <HowToArchive.childs.HowToPanel
                    howTo={parsedUrl.parsedContent.selectedHowto}
                />
            )}
        </div>
    )
}
