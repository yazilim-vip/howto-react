// ReactJS Core
import React, { useState } from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { Col, Row, Alert, FormControl } from 'react-bootstrap'
import 'react-sliding-pane/dist/react-sliding-pane.css'

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

import { searchArchive } from './util'
import { HOWTO_DEFAULT_VIEW_MODE } from './howToConstants'

const _HowToArchive = ({
    // values from mapStateToProps
    folderPath,
    selectedCategory,
    selectedCategoryName,
    selectedHowto,
    selectedHowtoName,
    howtoSelectedFlag,
    searchIndex,
    query,

    // from HowToBreacrumb
    categoryNames,
    rootCategorySelectedFlag,

    // from HowToFileManager
    // folderPath,
    isHit,
    categoryList,
    howtoList,

    // methods from props
    push,

    customRootHowToCategory
}) => {
    const [catList, setCatList] = useState(null)
    const [hwList, setHwList] = useState(null)
    const [viewMode, toggleViewMode] = useState(HOWTO_DEFAULT_VIEW_MODE)
    const [searchResult, setSearchResult] = useState(null)

    const onSearchResult = (query, categoryHits, howtoHits) => {
        // console.log(
        //     'query => ',
        //     query,
        //     'categoryHits => ',
        //     categoryHits,
        //     'howtoHits => ',
        //     howtoHits
        // )
        setCatList(categoryHits)
        setHwList(howtoHits)

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
                categoryList={catList === null ? categoryList : catList}
                howtoList={hwList === null ? howtoList : hwList}
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
