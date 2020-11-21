import React, { useState } from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { HowToArchive } from '@yazilim-vip/howto-archive-react'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { Page } from '../component'
import { Firebase } from '../util'
import { REDUX_ACTION_CREATORS } from '../redux'

class _HowTo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            howtoData: null,
            requestedPath: null,
            errorFlag: false,
            errorMessage: null,
            loadedFlag: false
        }
    }

    componentDidMount() {
        if (!this.state.loadedFlag) {
            this.fetchHowtoData()
        }
    }

    fetchHowtoData = () => {
        Firebase.database()
            .ref('howto')
            .on(
                'value',
                (snapshot) => {
                    if (snapshot.exists()) {
                        const val = snapshot.val()
                        const data = JSON.parse(val)
                        const path = this.props.history.location.pathname
                        console.log(JSON.stringify(data))
                        this.setState({
                            howtoData: data,
                            requestedPath: path,
                            errorFlag: false,
                            errorMessage: null,
                            loadedFlag: true
                        })
                    } else {
                        this.setState({
                            howtoData: null,
                            requestedPath: null,
                            errorFlag: true,
                            errorMessage: 'Snapshot can not found on firebase.',
                            loadedFlag: true
                        })
                    }
                },
                (error) => {
                    this.setState({
                        howtoData: null,
                        requestedPath: null,
                        errorFlag: true,
                        errorMessage: error,
                        loadedFlag: true
                    })
                }
            )
    }

    renderInfoPage = (content) => {
        return (
            <Page>
                <div className='row h-100 text-center'>
                    <div className='col-sm-12 my-auto'>{content}</div>
                </div>
            </Page>
        )
    }

    render() {
        const { fileManagerViewMode } = this.props
        const { howtoData, errorFlag, errorMessage, loadedFlag } = this.state
        const requestedPath = this.props.location.pathname

        if (!loadedFlag) {
            return this.renderInfoPage(<Spinner animation='border' />)
        }

        if (errorFlag) {
            return this.renderInfoPage(
                <Alert key={1} variant='danger'>
                    {errorMessage}
                </Alert>
            )
        }

        return (
            <Page span={{ span: 12 }}>
                <HowToArchive
                    key={`${requestedPath}-${Date.now()}`}
                    howtoData={howtoData}
                    requestedPath={requestedPath}
                    fileManagerViewMode={fileManagerViewMode}
                    onViewModeChange={(newViewMode) => {
                        this.props.onFmViewModeChange(newViewMode)
                        console.log(newViewMode)
                    }}
                    useState={useState}
                />
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    const howtoReducer = state.howtoReducer
    return {
        fileManagerViewMode: howtoReducer.fileManagerViewMode
    }
}

const mapDispatchToProps = { ...REDUX_ACTION_CREATORS }
export const HowTo = connect(mapStateToProps, mapDispatchToProps)(_HowTo)
