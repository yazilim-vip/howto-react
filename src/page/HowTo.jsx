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

                        this.props.onApiSuccess(data, path)
                    } else {
                        this.props.onApiError(
                            'Snapshot can not found on firebase.'
                        )
                    }
                },
                (error) => {
                    this.props.onApiError(error)
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
        const { error, isLoaded } = this.props

        if (!isLoaded) {
            return this.renderInfoPage(<Spinner animation='border' />)
        }

        if (error) {
            return this.renderInfoPage(
                <Alert key={1} variant='danger'>
                    {error}
                </Alert>
            )
        }

        return (
            <Page span={{ span: 12 }}>
                <HowToComponent.HowToArchive
                    customRootHowToCategory={this.props.rootCategory}
                />
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    const howtoReducer = state.howtoReducer

    return {
        error: howtoReducer.error,
        isLoaded: howtoReducer.isLoaded,
        rootCategory: howtoReducer.rootCategory
    }
}

const mapDispatchToProps = HowToComponent.HOWTO_ACTION_CREATORS

export const HowTo = connect(mapStateToProps, mapDispatchToProps)(_HowTo)
