// ReactJS Core
import React from 'react'

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
import { HOWTO_ACTION_CREATORS } from './redux/howToActionCreators'

import HowToBreadcrumb from './child/Breadcrumb'
import HowToFileManager from './child/FileManager'

import './HowToArchive.scss'
import { HOWTO_ITEM_TYPE } from './howToConstants'
import { ViewModeChanger } from './child/ViewModeChanger'
import { HowToPanel } from './child/HowToPanel'

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
    fileManagerViewMode,

    // from HowToBreacrumb
    categoryNames,
    rootCategorySelectedFlag,

    // from HowToFileManager
    // folderPath,
    isHit,
    categoryList,
    howtoList,
    // fileManagerViewMode

    // methods from props
    onSearchResult,
    onToggle,
    push
}) => {
    const search = (query) => {
        if (!query) {
            return onSearchResult('', null, null)
        }

        const hits = searchIndex.filter((o) =>
            o.name.includes(query.toLowerCase())
        )

        if (hits) {
            const categoryHits = []
            const howtoHits = []

            hits.forEach((hit) => {
                if (hit.type === HOWTO_ITEM_TYPE.CATEGORY_HIT) {
                    categoryHits.push(hit)
                } else if (hit.type === HOWTO_ITEM_TYPE.HOWTO_HIT) {
                    howtoHits.push(hit)
                }
            })

            onSearchResult(query, categoryHits, howtoHits)
        } else {
            onSearchResult(query, null, null)
        }
    }

    const renderHowtoContentElement = () => {
        if (selectedHowto) {
            return (
                <HowToPanel
                    howtoSelectedFlag={howtoSelectedFlag}
                    selectedHowto={selectedHowto}
                    onRequestClose={() => {
                        push(folderPath)
                    }}
                />
            )
        }

        if (howtoSelectedFlag) {
            return (
                <Alert key={1} variant='danger'>
                    <b>{selectedHowtoName}</b> not found in{' '}
                    <b>{selectedCategory.name}</b> folder.
                </Alert>
            )
        }
    }

    const renderMainContentElement = () => {
        if (!selectedCategory) {
            return (
                <Alert key={1} variant='danger'>
                    Category <b>{selectedCategoryName}</b> not found in path.
                </Alert>
            )
        }
        return (
            <div>
                <Row>
                    <Col md='7'>
                        <HowToBreadcrumb
                            categoryNames={categoryNames}
                            rootCategorySelectedFlag={rootCategorySelectedFlag}
                        />
                    </Col>

                    <Col md='2' sm='3' className='mb-2 mb-sm-0'>
                        <ViewModeChanger
                            fileManagerViewMode={fileManagerViewMode}
                            onToggle={onToggle}
                        />
                    </Col>

                    <Col md='3' sm='9'>
                        {/* <div className="mr-3 mt-2 align-items-center">
							<Switch />
						</div> */}

                        <FormControl
                            type='search'
                            placeholder='Search...'
                            aria-label='Search'
                            value={query}
                            onChange={(event) => search(event.target.value)}
                        />
                    </Col>
                </Row>

                <hr />

                <HowToFileManager
                    folderPath={folderPath}
                    isHit={isHit}
                    categoryList={categoryList}
                    howtoList={howtoList}
                    fileManagerViewMode={fileManagerViewMode}
                />

                {renderHowtoContentElement()}
            </div>
        )
    }

    return renderMainContentElement()
}

const mapStateToProps = (state) => {
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
        fileManagerViewMode: howtoReducer.fileManagerViewMode,

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
        // fileManagerViewMode: howtoReducer.fileManagerViewMode
    }
    return result
}

const mapDispatchToProps = { ...HOWTO_ACTION_CREATORS, push }
export const HowToArchive = connect(
    mapStateToProps,
    mapDispatchToProps
)(_HowToArchive)
