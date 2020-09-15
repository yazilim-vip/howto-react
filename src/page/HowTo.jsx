import React from "react";


import * as constants from '../constants'



import Page from "../component/Page";
import howtoRequestParser from '../util/HowtoRequestParser'
import HowToBrowser from "../component/HowToBrowser";


class HowTo extends React.Component {
    constructor(props) {
        super(undefined);
        let fullPath = props.match.params[0]
            // trim trailing '/' chracter    
            .replace(/\/$/, "")


        this.state = {
            error: null,
            isLoaded: false,

            // filled by user request
            howtoRequest: howtoRequestParser(fullPath),

            // filled by data from service
            selectedCategory: null,
            selectedHowto: null
        };

        this.renderMarkdownContent = this.renderMarkdownContent.bind(this)
    }

    componentDidMount() {
        this.fetchHowtoData()
    }

    //------------------------
    // Fetching HowTo Data From Service 
    //------------------------
    fetchHowtoData() {
        // get request to the HowTo Service
        fetch(constants.REST_URL + "?path=" + this.state.howtoRequest.folderPath)
            // convert response to json    
            .then(res => res.json())

            // handle response
            .then((res) => this.serviceSuccessHandler(res), (err) => this.serviceErrorHandler(err))
    }

    serviceSuccessHandler(data) {
        let { howtoRequest } = this.state

        console.log("url", constants.REST_URL + howtoRequest.folderPath, "data", data)

        // howto-service should return error response if content is empty, this check is temporary (QUESTION: Why Temporary??)
        if (Object.keys(data).length === 0) {
            this.setState({
                isLoaded: true,
            });
            return
        }

        let selectedCategory = data

        this.setState({
            isLoaded: true,
            selectedCategory: selectedCategory,
        });

        if (this.state.howtoRequest.howtoSelectedFlag) {
            let howto = selectedCategory.howtoList[this.state.howtoRequest.selectedHowtoName]
            this.renderMarkdownContent(howto)
        } else {
            this.loadFirstHowtoContent()
        }
    }

    loadFirstHowtoContent() {
        let { selectedCategory } = this.state

        let howtoList = selectedCategory.howtoList
        if (Object.keys(howtoList).length === 0) {
            // NO HowTo found under selectedCategory
            // So, there is no  first HowTo :)
            return;
        }

        let firstHowtoIndex = Object.keys(howtoList)[0]
        let firstHowto = howtoList[firstHowtoIndex]

        this.renderMarkdownContent(firstHowto)
        console.log("firstHowto", firstHowto)

        let rootCategorySelectedFlag = this.state.howtoRequest.rootCategorySelectedFlag
        let prefix = (rootCategorySelectedFlag) ? "" : (selectedCategory.name + "/")
        this.props.history.push(prefix + firstHowto.label);
    }

    renderMarkdownContent(selectedHowto) {
        if (selectedHowto && (Object.keys(selectedHowto).length !== 0)) {
            this.setState({
                selectedHowto: selectedHowto
            })
        }
    }

    serviceErrorHandler(error) {
        this.setState({
            isLoaded: true,
            error
        });
    }

    render() {
        const { error, isLoaded } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (!isLoaded) {
            return <div>Loading...</div>;
        }

        if (this.state.selectedHowto) {
            // console.log('rendering HowTO', this.state.selectedHowto.label)
        }
        
        return (
            <Page span={{ span: 12 }}>

                <HowToBrowser

                    // filled by user request
                    howtoRequest={this.state.howtoRequest}

                    // filled by data from service
                    selectedCategory={this.state.selectedCategory}
                    selectedHowto={this.state.selectedHowto}
                    onContentClick={this.renderMarkdownContent}
                />
            </Page>
        );
    }
}

export default HowTo