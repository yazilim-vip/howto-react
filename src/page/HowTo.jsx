import React from 'react'

// ---------------------------
//  External Dependencies
// ---------------------------
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { HBreadCrumb, HowToUtil } from '@yazilim-vip/howto-archive-react'

// ---------------------------
//  Internal Dependencies
// ---------------------------
import { Page } from '../component'
import { Firebase } from '../util'
import { REDUX_ACTION_CREATORS } from '../redux'

class _HowTo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.setState({
            errorFlag: false,
            errorMessage: null,
            loadedFlag: false
        })
        if (!this.state.loadedFlag) {
            this.fetchHowtoData()
        }
    }

    getInitialVieMode() {
        // return this.props.fileManagerViewMode
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
                        this.setState({
                            howtoData: HowToUtil.json2CategoryMapper(data),
                            errorFlag: false,
                            errorMessage: null,
                            loadedFlag: true
                        })
                    } else {
                        this.setState({
                            howtoData: null,
                            errorFlag: true,
                            errorMessage: 'Snapshot can not found on firebase.',
                            loadedFlag: true
                        })
                    }
                },
                (error) => {
                    this.setState({
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
        const { errorFlag, errorMessage, loadedFlag } = this.state

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
                <HBreadCrumb names={['emre', 'sen']} />
                {/* {this.getHowToArchiveElement(this.props.requestedPath)} */}
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    const howtoReducer = state.howtoReducer
    return {
        fileManagerViewMode: howtoReducer.fileManagerViewMode,
        requestedPath: howtoReducer.requestedPath
    }
}

const mapDispatchToProps = { ...REDUX_ACTION_CREATORS }
export const HowTo = connect(mapStateToProps, mapDispatchToProps)(_HowTo)
