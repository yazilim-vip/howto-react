// ReactJS Core
import React from 'react'

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

import { HOWTO_ACTION_CREATORS } from './redux/howToActionCreators'
import { mapStateToProps } from './redux/mapStateToProps'

import HowToBreadcrumb from './child/Breadcrumb'
import HowToFileManager from './child/FileManager'
import { ViewModeChanger } from './child/ViewModeChanger'
import { HowToPanel } from './child/HowToPanel'

import { searchArchive } from './util/searchArchive'

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
                    fileManagerViewMode={fileManagerViewMode}
                    onToggle={onToggle}
                />
            </Col>
            <Col md='3' sm='9'>
                <FormControl
                    type='search'
                    placeholder='Search...'
                    aria-label='Search'
                    value={query}
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

    console.log('fileManagerViewMode ==> ', fileManagerViewMode)
    const categoryFound = selectedCategory && true
    const howToFound = howtoSelectedFlag && selectedHowto
    const howToNotFound = howtoSelectedFlag && !selectedHowto
    if (!categoryFound) {
        return showError(
            <>
                Category <b>{selectedCategoryName}</b> not found in path.
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
                categoryList={categoryList}
                howtoList={howtoList}
                fileManagerViewMode={fileManagerViewMode}
            />

            {howToFound && (
                <HowToPanel
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
