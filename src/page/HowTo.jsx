import React from "react";

import Page from "../component/Page";
import HowToBrowser from "../component/howto/HowToBrowser";
import Firebase from "../util/Firebase";
import { connect } from "react-redux";
import { actionCreators } from "../redux/actions";
class HowTo extends React.Component {
	constructor(props) {
		super();

		// replace trailing '/' chracter
		let fullPath = props.match.params[0].replace(/\/$/, "")
		props.onPathChange(fullPath)
	}

	componentDidMount() {
		this.fetchHowtoData()
	}

	//------------------------
	// Fetching HowTo Data From Service
	//------------------------
	fetchHowtoData = () => {
		Firebase
			.database()
			.ref('howto')
			.on('value', (snapshot) => {
				const val = snapshot.val()
				const json = val.substring(1, val.length - 1)
				this.serviceSuccessHandler(JSON.parse(json))
			});
	}

	serviceSuccessHandler = (data, selectedCategory) => {
		this.props.onApiSuccess(data)
		this.loadCategory()

		if (selectedCategory === null) {
			return
		}

		if (this.props.howtoSelectedFlag) {
			let selectedHowtoName = this.props.selectedHowtoName
			if (selectedCategory.howtoList[selectedHowtoName]) {
				let howto = selectedCategory.howtoList[selectedHowtoName]
				this.renderHowto(howto)
			}
		}
	}

	serviceErrorHandler = (error) => {
		this.props.onError(error)
	}

	loadCategory = () => {
		console.log("HEREEE");
		let selectedCategory

		let tmpCategory = this.props.rootCategory
		let categoryNames = this.props.categoryNames

		for (let catIndex in categoryNames) {
			let cat = categoryNames[catIndex]

			if (!tmpCategory.subCategoryList[cat]) {
				tmpCategory = null
				break /// category not exists
			}

			tmpCategory = tmpCategory.subCategoryList[cat]
		}

		selectedCategory = tmpCategory

		this.props.selectCategory(selectedCategory)
	}

	renderHowto = (selectedHowto) => {
		let categoryPath = selectedHowto.categoryList.join("/")
		let howtoLabel = selectedHowto.label;

		let prefix = (this.props.rootCategorySelectedFlag) ? "" : (categoryPath + "/")
		let newFullPath = prefix + howtoLabel

		if (selectedHowto && (Object.keys(selectedHowto).length !== 0)) {
			this.props.onPathChange(newFullPath);
			this.props.selectHowto(selectedHowto);
			this.props.history.push(process.env.REACT_APP_HOWTO_PATH + "/" + newFullPath);
		}
	}

	renderCategory = (folderPath) => {
		this.props.onPathChange(folderPath)
		this.loadCategory()
		this.props.history.push(process.env.REACT_APP_HOWTO_PATH + "/" + folderPath);
	}
	
	renderInfoPage = (message) => { return (<Page>{message}</Page>) }

	render() {
		if (!this.isLoaded) {
			this.renderInfoPage("Loading...")
		}

		if (this.error) {
			this.renderInfoPage(this.props.error.message)
		}

		return (
			<Page span={{ span: 12 }}>
				<HowToBrowser
					// categoryNames={this.props.categoryNames}
					// selectedCategory={this.props.selectedCategory}
					// selectedHowto={this.props.selectedHowto}
					renderCategory={this.renderCategory.bind(this)}
					renderHowto={this.renderHowto.bind(this)}
				/>
			</Page>
		);
	}
}

const mapStateToProps = (state) => {
	const howtoReducer = state.howtoReducer

	return {
		error: howtoReducer.error,
		isLoaded: howtoReducer.isLoaded,
		rootCategory: howtoReducer.rootCategory,
		selectedCategory: howtoReducer.selectedCategory,
		selectedHowto: howtoReducer.selectedHowto,
		categoryNames: howtoReducer.categoryNames
	}
}

const mapDispatchToProps = actionCreators

export default connect(mapStateToProps, mapDispatchToProps)(HowTo)