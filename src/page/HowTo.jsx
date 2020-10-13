import React from "react";

import Page from "../component/Page";
import HowToBrowser from "../component/howto/HowToBrowser";
import Firebase from "../util/Firebase";
import { connect } from "react-redux";
import { actionCreators } from "../redux/actions";
class HowTo extends React.Component {

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
					'value', snapshot => {
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

		// replace trailing '/' chracter
		let fullPath = this.props.match.params[0].replace(/\/$/, "")
		this.props.onPathChange(fullPath)

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

	renderInfoPage = (message) => {
		return (
			<Page>
				<div className="row h-100 text-center">
					<div className="col-sm-12 my-auto">
						{message}
					</div>
				</div>
			</Page>)
	}

	render() {
		const { error, isLoaded } = this.props;

		if (!isLoaded) {
			return this.renderInfoPage("Loading...")
		}

		if (error) {
			return this.renderInfoPage(error.message)
		}

		return (
			<Page span={{ span: 12 }}>
				<HowToBrowser />
			</Page>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.error,
		isLoaded: state.isLoaded,
		rootCategory: state.rootCategory,
		selectedCategory: state.selectedCategory,
		selectedHowto: state.selectedHowto,
		categoryNames: state.categoryNames,
		folderPath: state.folderPath,
		rootCategorySelectedFlag: state.rootCategorySelectedFlag
	}
}

const mapDispatchToProps = actionCreators

export default connect(mapStateToProps, mapDispatchToProps)(HowTo)