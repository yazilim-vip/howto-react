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
		if (!this.rootCategory) {
			Firebase
				.database()
				.ref('howto')
				.on(
					'value', (snapshot) => {
						const val = snapshot.val()
						const json = val.substring(1, val.length - 1)
						this.serviceSuccessHandler(JSON.parse(json))
					},
					error => {
						this.onError(error)
					}
				)
		}
	}

	serviceSuccessHandler = (data) => {
		let selectedCategory = this.props.selectedCategory

		this.props.onApiSuccess(data)
		this.props.selectCategory()

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

	renderInfoPage = (message) => { return (<Page>{message}</Page>) }

	render() {
		let isLoaded = this.props.isLoaded
		let error = this.props.error
		// console.log("IS LOADED ?", isLoaded);

		if (!isLoaded) {
			this.renderInfoPage("Loading...")
		}

		if (error) {
			this.renderInfoPage(error.message)
		}

		return (
			<Page span={{ span: 12 }}>
				<HowToBrowser />
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
		categoryNames: howtoReducer.categoryNames,
		folderPath: howtoReducer.folderPath,
		rootCategorySelectedFlag: howtoReducer.rootCategorySelectedFlag
	}
}

const mapDispatchToProps = actionCreators

export default connect(mapStateToProps, mapDispatchToProps)(HowTo)