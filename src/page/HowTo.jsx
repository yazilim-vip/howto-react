import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { connect } from 'react-redux'
import { Alert, Spinner } from 'react-bootstrap'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { Page, HowTo as HowToComponent } from '../component'
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
        const { rootCategory } = this.props

        if (!rootCategory) {
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
        const requestedPath = this.props.requestedPath
            ? this.props.requestedPath
            : '/howto'

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
                <HowToComponent.HowToArchive
                    howtoData={howtoData}
                    requestedPath={requestedPath}
                />
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    const howtoReducer = state.howtoReducer
    return {
        requestedPath: howtoReducer.requestedPath
    }
}

const mapDispatchToProps = HowToComponent.HOWTO_ACTION_CREATORS

export const HowTo = connect(mapStateToProps, mapDispatchToProps)(_HowTo)