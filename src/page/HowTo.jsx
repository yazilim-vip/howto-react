import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Alert, Spinner } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { Page, HowToArchive } from '../component'
import { Firebase } from '../util'

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
            .ref('howto-dev')
            .on(
                'value',
                (snapshot) => {
                    if (snapshot.exists()) {
                        const val = snapshot.val()
                        const data = JSON.parse(val)
                        const path = this.props.history.location.pathname

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
                    howtoData={howtoData}
                    requestedPath={requestedPath}
                />
            </Page>
        )
    }
}

export const HowTo = _HowTo
