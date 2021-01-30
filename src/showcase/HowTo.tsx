import React, { useEffect, useState } from 'react'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

import { HowToContainer, FileManagerViewMode, Category, json2CategoryMapper } from '../lib'
import { createToggleAction } from './redux/actions'
import { history } from './redux/configureStore'

declare global {
    interface Window {
        _env_: any
    }
}

// Firabase
const config = {
    apiKey: 'AIzaSyDlYpctL19t8-r4A_pyGMrZggnbbdsJ1zI',
    databaseURL: 'https://yvip-howto.firebaseio.com',
    projectId: 'yvip-howto'
}
export const firebaseApp = firebase.initializeApp(config)

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
        console.log('process.env.REACT_APP_HOWTO_SOURCE', process.env.REACT_APP_HOWTO_SOURCE)
        if (process.env.REACT_APP_HOWTO_SOURCE === 'firebase') {
            firebaseApp
                .auth()
                .signInAnonymously()
                .then(() => {
                    firebaseApp
                        .database()
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
                })
                .catch((error) => {
                    console.log('login failed', error)
                    // ...
                })
        } else if (process.env.REACT_APP_HOWTO_SOURCE === 'service') {
            // Simple GET request using fetch
            fetch(window._env_.API_URL)
                .then((response) => response.json())
                .then((data) => {
                    setHowToData(json2CategoryMapper(data))
                    setLoadedFlag(true)
                    setErrorFlag(false)
                })
                .catch((error) => {
                    setLoadedFlag(true)
                    setErrorFlag(true)
                    setErrorMessage(`${error}`)
                })
        }
    }

    if (!loadedFlag) {
        return (
            <div className="d-flex h-100">
                <Spinner animation="border" className="mx-auto align-self-center" />
            </div>
        )
    }

    if (!howToData || errorFlag) {
        return (
            <Alert key={1} variant="danger">
                {errorMessage}
            </Alert>
        )
    }

    // console.log(requestedPath)
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
        // align-items-stretch"
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
