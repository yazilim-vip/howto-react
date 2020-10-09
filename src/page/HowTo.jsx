import React from "react";

import Page from "../component/Page";
import howtoRequestParser from '../util/HowtoRequestParser'
import HowToBrowser from "../component/howto/HowToBrowser";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/database";


class HowTo extends React.Component {
	constructor(props) {
		super(props);

		let fullPath = props.match.params[0]
			// trim trailing '/' chracter
			.replace(/\/$/, "")

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

		this.renderHowto = this.renderHowto.bind(this)
		this.renderCategory = this.renderCategory.bind(this)
	}

	componentDidMount() {
		this.fetchHowtoData()
	}

	//------------------------
	// Fetching HowTo Data From Service
	//------------------------
	fetchHowtoData() {

		// TODO: Replace the following with your app's Firebase project configuration
		// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
		// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
		var firebaseConfig = {
			databaseURL: "https://yvip-howto.firebaseio.com",
			projectId: "yvip-howto",
		};

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);

		firebase.database().ref('howto').on('value', (snapshot) => {
			const val = snapshot.val()
			const json = val.substring(1, val.length - 1)
			this.serviceSuccessHandler(JSON.parse(json))
		});
	}

	serviceSuccessHandler(data) {
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
		if (selectedCategory === null) {
			return
		}

		let selectedHowtoName = this.state.howtoRequest.selectedHowtoName
		if (this.state.howtoRequest.howtoSelectedFlag) {
			if (selectedCategory.howtoList[selectedHowtoName]) {
				let howto = selectedCategory.howtoList[selectedHowtoName]
				this.renderHowto(howto)
			}
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


			for (let catIndex in categoryNames) {
				let cat = categoryNames[catIndex]

				if (!tmpCategory.subCategoryList[cat]) {
					tmpCategory = null
					break /// category not exists
				}

				tmpCategory = tmpCategory.subCategoryList[cat]
			}

			selectedCategory = tmpCategory
		}

		this.setState({
			selectedCategory: selectedCategory
		})
	}

	renderHowto(selectedHowto) {
		let categoryPath = selectedHowto.categoryList.join("/")
		let howtoLabel = selectedHowto.label;

		// console.log(this.state)
		let prefix = (this.state.howtoRequest.rootCategorySelectedFlag) ? "" : (categoryPath + "/")
		let newFullPath = prefix + howtoLabel
		console.log("newFullPath", newFullPath)
		let howtoRequest = howtoRequestParser(newFullPath)

		if (selectedHowto && (Object.keys(selectedHowto).length !== 0)) {
			this.setState({
				selectedHowto: selectedHowto,
				howtoRequest: howtoRequest
			}, () => {
				this.props.history.push(process.env.REACT_APP_HOWTO_PATH + "/" + newFullPath);
			})
		}
	}

	renderCategory(folderPath) {
		console.log('incoming folder path = ', folderPath)
		let howtoRequest = howtoRequestParser(folderPath)
		console.log('new howtoRequest = ', howtoRequest)
		// linux/specific_distor
		// ! this.setState is async function
		this.setState({
			howtoRequest: howtoRequest,
			selectedHowto: null
		}, () => {
			this.loadCategory()
			console.log('hebeeeee', this.state.howtoRequest.folderPath)
			this.props.history.push(process.env.REACT_APP_HOWTO_PATH + "/" + this.state.howtoRequest.folderPath);
		})
	}

	render() {
		const { error, isLoaded } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		}

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		return (
			<Page span={{ span: 12 }}>

				<HowToBrowser
					// filled by user request
					howtoRequest={this.state.howtoRequest}

					// filled by data from service
					selectedCategory={this.state.selectedCategory}
					selectedHowto={this.state.selectedHowto}
					renderCategory={this.renderCategory}
					renderHowto={this.renderHowto}
				/>
			</Page>
		);
	}
}

export default HowTo