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

        console.log("fullPath", fullPath)


        this.state = {
            error: null,
            isLoaded: false,

            // filled by user request
            howtoRequest: howtoRequestParser(fullPath),

            // filled by data from service
            rootCategory: null,
            selectedCategory: null,
            selectedHowto: null
        };

        this.renderMarkdownContent = this.renderMarkdownContent.bind(this)
        this.renderCategoryContent = this.renderCategoryContent.bind(this)
    }

    componentDidMount() {
        this.fetchHowtoData()
    }

    //------------------------
    // Fetching HowTo Data From Service 
    //------------------------
    fetchHowtoData() {
        // get request to the HowTo Service
        fetch(constants.REST_URL + "/")
            // convert response to json    
            .then(res => res.json())

            // handle response
            .then((res) => this.serviceSuccessHandler(res), (err) => this.serviceErrorHandler(err))
    }

    serviceSuccessHandler(data) {
        // howto-service should return error response if content is empty, this check is temporary (QUESTION: Why Temporary??)
        if (Object.keys(data).length === 0) {
            this.setState({
                isLoaded: true,
            });
            return
        }
        // howto-service should return error response if content is empty, this check is temporary (QUESTION: Why Temporary??)
        if (Object.keys(data).length === 0) {
            this.setState({
                isLoaded: true,
            });
            return
        }

        this.setState({
            isLoaded: true,
            rootCategory: data,
        });

        // set selected category to state
        this.loadCategory()

        let selectedCategory = this.state.selectedCategory
        let selectedHowtoName = this.state.howtoRequest.selectedHowtoName
        if (this.state.howtoRequest.howtoSelectedFlag) {
            let howto = selectedCategory.howtoList[selectedHowtoName]
            this.renderMarkdownContent(howto)
        } else {
            // this.loadFirstHowtoContent()
        }
    }

    serviceErrorHandler(error) {
        this.setState({
            isLoaded: true,
            error
        });
    }

    loadCategory() {
        let selectedCategory
        let rootCategory = this.state.rootCategory

        if (this.state.howtoRequest.rootCategorySelectedFlag) {
            selectedCategory = rootCategory
        } else {

            // linux, specific_distro, manjaro
            let categoryNames = this.state.howtoRequest.categoryNames

            //......
            let tmpCategory = rootCategory
            

            console.log("beforeLoop", categoryNames)
            for (var catIndex in categoryNames) {
                let cat = categoryNames[catIndex]
                console.log("cat", cat)

                if (!tmpCategory.subCategoryList[cat]) {
                    tmpCategory =  null
                    break /// category not exists
                }

                tmpCategory = tmpCategory.subCategoryList[cat]
            }
            
            selectedCategory = tmpCategory
        }

        // console.log("categoryNames", this.state.howtoRequest.categoryNames)
        console.log("selectedCategory", selectedCategory)

        this.setState({
            selectedCategory: selectedCategory
        })
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

    renderCategoryContent(folderPath) {
        console.log("====> new folderPath", folderPath)
        // linux/specific_distor
        this.setState({
            howtoRequest: howtoRequestParser(folderPath)
        })
        this.loadCategory()
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
                    onCategoryClick={this.renderCategoryContent}
                />
            </Page>
        );
    }
}

export default HowTo