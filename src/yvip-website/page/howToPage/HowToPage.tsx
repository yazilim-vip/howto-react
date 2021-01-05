import React, { useEffect, useState } from 'react'

// ---------------------------
//  External Dependencies.
// ---------------------------
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

// ---------------------------
//  Project Dependencies
// ---------------------------
import { HowTo, PageLayout } from 'yvip-website/component'
import { Firebase } from 'yvip-website/util'
import { createToggleAction } from 'yvip-website/redux/actions'

const _HowToPage = ({ requestedPath, fileManagerViewMode, createToggleAction }: any) => {
    const [howToData, setHowToData] = useState<HowTo.models.Category | null>(null)
    const [errorFlag, setErrorFlag] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loadedFlag, setLoadedFlag] = useState<boolean>(false)

    useEffect(() => {
        if (!loadedFlag) {
            fetchHowtoData()
        }
    })

    const fetchHowtoData = () => {
        Firebase.database()
            .ref('howto')
            .on(
                'value',
                (snapshot) => {
                    if (snapshot.exists()) {
                        const val = snapshot.val()
                        const data = JSON.parse(val)
                        setHowToData(HowTo.utils.json2CategoryMapper(data))
                        setLoadedFlag(true)
                        setErrorFlag(false)
                    } else {
                        setLoadedFlag(true)
                        setErrorFlag(true)
                        setErrorMessage('Snapshot can not found on firebase.')
                    }
                },
                (error: any) => {
                    setLoadedFlag(true)
                    setErrorFlag(true)
                    setErrorMessage(`${error}`)
                }
            )
    }

    const renderInfoPage = (content: any) => {
        return (
            <PageLayout>
                <div className="row h-100 text-center">
                    <div className="col-sm-12 my-auto">{content}</div>
                </div>
            </PageLayout>
        )
    }

    if (!loadedFlag) {
        return renderInfoPage(<Spinner animation="border" />)
    }

    if (!howToData || errorFlag) {
        return renderInfoPage(
            <Alert key={1} variant="danger">
                {errorMessage}
            </Alert>
        )
    }

    return (
        <PageLayout span={{ span: 12 }}>
            <HowTo.HowToContainer
                key={`${requestedPath}-${new Date()}`}
                rootCategory={howToData}
                requestedPath={requestedPath}
                viewMode={fileManagerViewMode}
                events={{
                    viewModeToggleEventHandler: () => {
                        createToggleAction()
                    }
                }}
            />
        </PageLayout>
    )
}

const mapStateToProps = (state: { howtoReducer: any; locationReducer: any }) => {
    return {
        fileManagerViewMode: state.howtoReducer.fileManagerViewMode,
        requestedPath: state.locationReducer.requestedPath
    }
}

const mapDispatchToProps = { createToggleAction }
export const HowToPage = connect(mapStateToProps, mapDispatchToProps)(_HowToPage)
