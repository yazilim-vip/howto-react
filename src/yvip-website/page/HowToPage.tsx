import React, { useEffect, useState } from 'react'

// eslint-disable-next-line import/default
import { HowToContainer, Category, json2CategoryMapper, FileManagerViewMode } from '@yazilim-vip/react-howto'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

import { PageLayout } from 'yvip-website/component/PageLayout'
import { history } from 'yvip-website/redux'
import { createToggleAction } from 'yvip-website/redux/actions'
import { Firebase } from 'yvip-website/util'

interface HowToPageProps {
    requestedPath: string
    fileManagerViewMode: FileManagerViewMode
    createToggleAction: () => void
}

const _HowToPage = ({ requestedPath, fileManagerViewMode, createToggleAction }: HowToPageProps) => {
    const [howToData, setHowToData] = useState<Category | null>(null)
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

    const renderInfoPage = (content: JSX.Element) => {
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
        <PageLayout>
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
        </PageLayout>
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
