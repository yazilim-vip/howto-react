import React, { useEffect, useState } from 'react'

// eslint-disable-next-line import/default
import { HowToContainer, Category, json2CategoryMapper, FileManagerViewMode } from '@yazilim-vip/react-howto'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

import { Firebase } from 'yvip-website/App'
import { history } from 'yvip-website/redux'
import { createToggleAction } from 'yvip-website/redux/actions'

interface HowToPageProps {
    requestedPath: string
    fileManagerViewMode: FileManagerViewMode
    createToggleAction: () => void
}

const _HowToPage = ({ requestedPath, fileManagerViewMode, createToggleAction }: HowToPageProps) => {
    // states
    const [howToData, setHowToData] = useState<Category | null>(null)
    const [errorFlag, setErrorFlag] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loadedFlag, setLoadedFlag] = useState<boolean>(false)

    // hooks
    useEffect(() => {
        if (!loadedFlag) {
            fetchHowtoData()
        }
    })

    // methods
    const fetchHowtoData = () => {
        Firebase.database()
            .ref('howto')
            .on(
                'value',
                (snapshot) => {
                    if (snapshot.exists()) {
                        const val = snapshot.val()
                        const data = JSON.parse(val)
                        setHowToData(json2CategoryMapper(data))
                        setLoadedFlag(true)
                        setErrorFlag(false)
                    } else {
                        setLoadedFlag(true)
                        setErrorFlag(true)
                        setErrorMessage('Snapshot can not found on firebase.')
                    }
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (error: any) => {
                    setLoadedFlag(true)
                    setErrorFlag(true)
                    setErrorMessage(`${error}`)
                }
            )
    }

    if (!loadedFlag) {
        return <Spinner animation="border" />
    }

    if (!howToData || errorFlag) {
        return (
            <Alert key={1} variant="danger">
                {errorMessage}
            </Alert>
        )
    }
    return (
        <HowToContainer
            key={`${requestedPath}-${new Date()}`}
            rootCategory={howToData}
            requestedPath={requestedPath}
            viewMode={fileManagerViewMode}
            events={{
                viewModeToggle: () => {
                    createToggleAction()
                },
                itemSelected: (type, link) => {
                    history.push(link)
                }
            }}
        />
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: { howtoReducer: any; locationReducer: any }) => {
    return {
        fileManagerViewMode: state.howtoReducer.fileManagerViewMode,
        requestedPath: state.locationReducer.requestedPath
    }
}

const mapDispatchToProps = { createToggleAction }
export const HowToPage = connect(mapStateToProps, mapDispatchToProps)(_HowToPage)
