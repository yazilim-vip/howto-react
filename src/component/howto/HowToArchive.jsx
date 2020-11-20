// ReactJS Core
import React, { useState } from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Col, Row, Alert, FormControl, Badge } from 'react-bootstrap'
import 'react-sliding-pane/dist/react-sliding-pane.css'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import './HowToArchive.scss'
import {
    HowToBreadcrumb,
    HowToFileManager,
    ViewModeChanger,
    HowToPanel
} from './child'
import {
    createSearchIndex,
    parsePathAndSetContent,
    searchArchive
} from './util'
import { HOWTO_DEFAULT_VIEW_MODE } from './HowToConstants'

const _HowToArchive = (props) => {
    const { howtoData, requestedPath, fileManagerViewMode, onViewModeChange } = props
    const initialViewMode =
        fileManagerViewMode === null || fileManagerViewMode === undefined
            ? HOWTO_DEFAULT_VIEW_MODE
            : fileManagerViewMode

    // state hooks
    const [viewMode, toggleViewMode] = useState(initialViewMode)
    const [searchFlag, setSearchFlag] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)
    const [searchResult, setSearchResult] = useState(null)

    if (!(howtoData && requestedPath)) {
        return <div />
    }

    const {
        categoryNames,
        folderPath,
        howtoSelectedFlag,
        rootCategorySelectedFlag,
        selectedCategory,
        selectedHowto,
        selectedHowtoName
    } = parsePathAndSetContent(howtoData, requestedPath)
    if (!selectedCategory) {
        return (
            <>
                Category <b>{folderPath.replace('/howto/', '')}</b> not found in
                path.
            </>
        )
    }

    const searchIndex = createSearchIndex(howtoData)
    const isHit = searchFlag
    const categoryList = selectedCategory.subCategoryList
    const howtoList = selectedCategory.howtoList

    const categoryFound = selectedCategory && true
    const howToFound = howtoSelectedFlag && selectedHowto
    const howToNotFound = howtoSelectedFlag && !selectedHowto

    const onSearchEvent = (event) => {
        const value = event.target.value
        if (value) {
            const result = searchArchive(searchIndex, value)
            setSearchFlag(true)
            setSearchQuery(result.query)
            setSearchResult(result)
        } else {
            setSearchFlag(false)
            setSearchQuery(null)
            setSearchResult(null)
        }
    }

    const showError = (errMsg) => (
        <Alert key={1} variant='danger'>
            {errMsg}
        </Alert>
    )

    const renderHeader = () => {
        const searchMode = searchFlag && searchQuery && true

        return (
            <Row>
                <Col md='7'>
                    <HowToBreadcrumb
                        categoryNames={categoryNames}
                        rootCategorySelectedFlag={rootCategorySelectedFlag}
                    />
                    {searchMode && (
                        <div className='d-inline search-result-div'>
                            <span className='mr-3'>Search Result for :</span>
                            <Badge pill variant='dark'>
                                {searchQuery}
                            </Badge>
                        </div>
                    )}
                </Col>
                <Col md='2' sm='3' className='mb-2 mb-sm-0'>
                    <ViewModeChanger
                        fileManagerViewMode={viewMode}
                        onViewModeChange={() => {
                            const newViewMode = !viewMode
                            if (onViewModeChange) {
                                onViewModeChange &&
                                    onViewModeChange(newViewMode)
                            } else {
                                toggleViewMode(newViewMode)
                            }
                        }}
                    />
                </Col>
                <Col md='3' sm='9'>
                    <FormControl
                        type='search'
                        placeholder='Search...'
                        aria-label='Search'
                        value={searchFlag ? searchQuery : ''}
                        onChange={onSearchEvent}
                    />
                </Col>
            </Row>
        )
    }

    if (!categoryFound) {
        return showError(
            <>
                Category <b>{folderPath.replace('/howto/', '')}</b> not found in
                path.
            </>
        )
    }

    return (
        <div>
            {renderHeader()}
            <hr />

            {howToNotFound && (
                <Alert key={1} variant='danger'>
                    <b>{selectedHowtoName}</b> not found in{' '}
                    <b>{selectedCategory.name}</b> folder.
                </Alert>
            )}

            {(categoryList || howtoList) && (
                <HowToFileManager
                    folderPath={folderPath}
                    isHit={isHit}
                    categoryList={
                        searchResult ? searchResult.categoryHits : categoryList
                    }
                    howtoList={
                        searchResult ? searchResult.howtoHits : howtoList
                    }
                    fileManagerViewMode={viewMode}
                />
            )}

            {howToFound && (
                <HowToPanel
                    categoryNames={categoryNames}
                    rootCategorySelectedFlag={rootCategorySelectedFlag}
                    howtoSelectedFlag={howtoSelectedFlag}
                    selectedHowto={selectedHowto}
                    folderPath={folderPath}
                />
            )}
        </div>
    )
}

export const HowToArchive = _HowToArchive
