import React, { FC, useState } from 'react'

import { Alert, Row, Col, FormControl, Badge } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

import { HOWTO_DEFAULT_VIEW_MODE, HOWTO_ITEM_TYPE_CATEGORY } from '../constants'
import { SearchResult } from '../models/SearchResult'
import { HowToContainerProps, FileManagerViewMode } from '../types'
import { createSearchIndex } from '../utils/createSearchIndex'
import { getFileManagerItemList } from '../utils/getFileManagerItemList'
import { getSearchResultItemList } from '../utils/getSearchResultItemList'
import { parsePathAndSetContent } from '../utils/parsePathAndSetContent'
import { searchArchive } from '../utils/searchArchive'
import { toggleFmViewMode } from '../utils/toggleFmViewMode'
import { FileManager } from './FileManager'
import { PathBreadcrumb } from './PathBreadcrumb'
import { ViewModeChanger } from './ViewModeChanger'
import './HowToContainer.css'

export const HowToContainer: FC<HowToContainerProps> = ({
    rootCategory,
    requestedPath,
    viewMode,
    events
}: HowToContainerProps) => {
    // states
    const [searchResult, setSearchResult] = useState<SearchResult | undefined>(undefined)
    const [fmViewMode, setFmViewMode] = useState<FileManagerViewMode>(viewMode)

    // constants
    const searchIndex = createSearchIndex(rootCategory)
    const parsedUrl = parsePathAndSetContent(rootCategory, requestedPath)
    const selectedCategory = parsedUrl?.parsedContent?.selectedCategory
    const pathBreadcrumbElements = parsedUrl?.categoryNames
    if (parsedUrl?.selectedHowtoName) {
        pathBreadcrumbElements.push(parsedUrl.selectedHowtoName)
    }

    // events
    const handlerViewModeToggleEvent = () => {
        if (events.viewModeToggleEventHandler) {
            events.viewModeToggleEventHandler()
        } else {
            const newViewMode = toggleFmViewMode(fmViewMode)
            setFmViewMode(newViewMode)
        }
    }

    const handlerSearchEvent = (query: string) => {
        if (events.searchEventHandler) {
            events.searchEventHandler(query)
        } else {
            if (query) {
                const searchResult = searchArchive(searchIndex, query)
                setSearchResult(searchResult)
            } else {
                setSearchResult(undefined)
            }
        }
    }

    // render ui
    if (!parsedUrl.categoryFoundFlag) {
        return (
            <div>
                Category <b>{parsedUrl.folderPath.replace('/howto/', '') + ' '}</b>
                not found in path.
                <br />
                <div onClick={() => events.itemSelectEventHandler(HOWTO_ITEM_TYPE_CATEGORY, '/howto')}>
                    Go to root directory
                </div>
            </div>
        )
    }

    return (
        <div>
            <Row>
                <Col md="7">
                    <PathBreadcrumb
                        items={pathBreadcrumbElements}
                        itemSelectEventHandler={events.itemSelectEventHandler}
                    />
                    {searchResult && (
                        <div className="search-result-div">
                            <span className="mr-3">Search Result for :</span>
                            <Badge pill variant="dark">
                                {searchResult.query}
                            </Badge>
                        </div>
                    )}
                </Col>
                <Col md="2" sm="3" className="mb-2 mb-sm-0">
                    <div className="d-flex bd-highlight mb-3">
                        <div className="ml-auto mr-4"></div>

                        {!parsedUrl.howtoSelectedFlag && (
                            <ViewModeChanger
                                viewMode={fmViewMode}
                                viewModeToggleEventHandler={handlerViewModeToggleEvent}
                            />
                        )}
                    </div>
                </Col>
                <Col md="3" sm="9">
                    <FormControl
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        value={searchResult ? searchResult.query : ''}
                        onChange={(event) => {
                            const searchQuery = event.target.value
                            handlerSearchEvent(searchQuery)
                        }}
                    />
                </Col>
            </Row>
            <hr />
            {!searchResult && parsedUrl.howtoSelectedFlag && !parsedUrl.howToFoundFlag && (
                <Alert key={1} variant="danger">
                    <b>Whopps {parsedUrl.selectedHowtoName}</b> not found in <b>{selectedCategory?.name}</b> folder.
                    <br />
                    {/* <Link to={parsedUrl.folderPath}>Go to {selectedCategory?.name} category</Link> */}
                </Alert>
            )}
            {!searchResult && parsedUrl.howToFoundFlag ? (
                <ReactMarkdown source={parsedUrl?.parsedContent?.selectedHowto?.markdownContent} />
            ) : (
                <FileManager
                    itemSelectedEventHandler={events.itemSelectEventHandler}
                    viewMode={fmViewMode}
                    itemList={
                        searchResult
                            ? getSearchResultItemList(searchResult)
                            : getFileManagerItemList(selectedCategory, parsedUrl.folderPath)
                    }
                />
            )}
        </div>
    )
}

HowToContainer.defaultProps = {
    viewMode: HOWTO_DEFAULT_VIEW_MODE
}
