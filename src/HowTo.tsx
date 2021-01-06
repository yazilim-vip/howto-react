import React, { useEffect, useState } from 'react'

// eslint-disable-next-line import/default
import { HowToContainer, Category, json2CategoryMapper, FileManagerViewMode } from '@yazilim-vip/react-howto'
import { Firebase } from 'App'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

import { createToggleAction } from './redux/actions'
import { history } from './redux/configureStore'

interface HowToProps {
    requestedPath: string
    fileManagerViewMode: FileManagerViewMode
    createToggleAction: () => void
}

const _HowTo = ({ requestedPath, fileManagerViewMode, createToggleAction }: HowToProps) => {
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
    console.log(requestedPath)
    const path = requestedPath === '/' ? '/howto' : '/howto' + requestedPath
    return (
        <HowToContainer
            key={`${requestedPath}-${new Date()}`}
            rootCategory={howToData}
            requestedPath={path}
            viewMode={fileManagerViewMode}
            events={{
                viewModeToggleEventHandler: () => {
                    createToggleAction()
                },
                itemSelectEventHandler: (type, link) => {
                    history.push(link.replace('/howto', ''))
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
export const HowTo = connect(mapStateToProps, mapDispatchToProps)(_HowTo)
