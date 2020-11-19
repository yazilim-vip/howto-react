// ReactJS Core
import React, { useState } from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { Col, Row, Alert, FormControl } from 'react-bootstrap'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import _ from 'underscore'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import './HowToArchive.scss'

import { HOWTO_ACTION_CREATORS, mapStateToProps } from './redux'

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

import { HOWTO_DEFAULT_VIEW_MODE } from './howToConstants'

const _HowToArchive = ({
    // methods from props
    push,

    // new props
    newRootCategory,
    newPath
}) => {
    const [searchedCategoryList, setSearchedCategoryList] = useState(null)
    const [searchoedHowtoList, setSearchedHowtoList] = useState(null)
    const [viewMode, toggleViewMode] = useState(HOWTO_DEFAULT_VIEW_MODE)
    const [searchResult, setSearchResult] = useState(null)

    if (!(newRootCategory && newPath)) {
        return <div />
    }

    const {
        categoryNames,
        folderPath,
        howtoSelectedFlag,
        rootCategorySelectedFlag,
        selectedCategory,
        selectedHowto,
        selectedHowtoName,
        categoryHits,
        howtoHits
    } = parsePathAndSetContent(newRootCategory, newPath)
    const searchIndex = createSearchIndex(newRootCategory)
    const isHit = categoryHits || howtoHits

    if (!selectedCategory) {
        return <div />
    }
    const categoryList = categoryHits
        ? _.extend({}, categoryHits)
        : selectedCategory.subCategoryList
    const howtoList = howtoHits
        ? _.extend({}, howtoHits)
        : selectedCategory.howtoList

    const onSearchResult = (query, categoryHits, howtoHits) => {
        setSearchedCategoryList(categoryHits)
        setSearchedHowtoList(howtoHits)
        setSearchResult({
            query: query,
            categoryHits: categoryHits,
            howtoHits: howtoHits
        })
    }

    const showError = (errMsg) => (
        <Alert key={1} variant='danger'>
            {errMsg}
        </Alert>
    )

    const renderHeader = () => (
        <Row>
            <Col md='7'>
                <HowToBreadcrumb
                    categoryNames={categoryNames}
                    rootCategorySelectedFlag={rootCategorySelectedFlag}
                />
            </Col>
            <Col md='2' sm='3' className='mb-2 mb-sm-0'>
                <ViewModeChanger
                    fileManagerViewMode={viewMode}
                    onToggle={() => toggleViewMode(!viewMode)}
                />
            </Col>
            <Col md='3' sm='9'>
                <FormControl
                    type='search'
                    placeholder='Search...'
                    aria-label='Search'
                    value={searchResult ? searchResult.query : ''}
                    onChange={(event) => {
                        return searchArchive(
                            searchIndex,
                            event.target.value, // query
                            onSearchResult
                        )
                    }}
                />
            </Col>
        </Row>
    )

    const categoryFound = selectedCategory && true
    const howToFound = howtoSelectedFlag && selectedHowto
    const howToNotFound = howtoSelectedFlag && !selectedHowto
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

            <HowToFileManager
                folderPath={folderPath}
                isHit={isHit}
                categoryList={
                    searchedCategoryList === null
                        ? categoryList
                        : searchedCategoryList
                }
                howtoList={
                    searchoedHowtoList === null ? howtoList : searchoedHowtoList
                }
                fileManagerViewMode={viewMode}
            />

            {howToFound && (
                <HowToPanel
                    categoryNames={categoryNames}
                    rootCategorySelectedFlag={rootCategorySelectedFlag}
                    howtoSelectedFlag={howtoSelectedFlag}
                    selectedHowto={selectedHowto}
                    onRequestClose={() => {
                        push(folderPath)
                    }}
                />
            )}
        </div>
    )
}

const mapDispatchToProps = { ...HOWTO_ACTION_CREATORS, push }
export const HowToArchive = connect(
    mapStateToProps,
    mapDispatchToProps
)(_HowToArchive)
