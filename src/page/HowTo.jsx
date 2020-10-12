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
		props.changePath(fullPath)

		this.renderHowto = this.renderHowto.bind(this)
		this.renderCategory = this.renderCategory.bind(this)
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
		this.props.changeRootCategory(data)
		this.selectCategory()

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

	selectCategory = (rootCategory, categoryNames) => {
		let selectedCategory

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

		this.props.changeSelectedCategory(selectedCategory)
	}

	renderHowto = (selectedHowto) => {
		let categoryPath = selectedHowto.categoryList.join("/")
		let howtoLabel = selectedHowto.label;

		let prefix = (this.props.rootCategorySelectedFlag) ? "" : (categoryPath + "/")
		let newFullPath = prefix + howtoLabel

		if (selectedHowto && (Object.keys(selectedHowto).length !== 0)) {
			this.props.changePath(newFullPath);
			this.props.changeSelectedHowto(selectedHowto);
			this.props.history.push(process.env.REACT_APP_HOWTO_PATH + "/" + newFullPath);
		}
	}

	renderCategory = (folderPath) => {
		this.props.changePath(folderPath)
		this.selectCategory()
		this.props.history.push(process.env.REACT_APP_HOWTO_PATH + "/" + folderPath);
	}

	preLoad = (isLoaded, error) => {
		if (!isLoaded) {
			return <div>Loading...</div>;
		} else if (error) {
			return <div>Error: {error.message}</div>;
		}
	}

	renderInfoPage = (message) => { return (<Page>{message}</Page>) }

	render() {
		if (!this.props.isLoaded) {
			this.renderInfoPage("Loading...")
		}

		if (this.props.error) {
			this.renderInfoPage(this.props.error.message)
		}

		return (
			<Page span={{ span: 12 }}>
				<HowToBrowser
					categoryNames={this.props.categoryNames}
					selectedCategory={this.props.selectedCategory}
					selectedHowto={this.props.selectedHowto}
					renderCategory={this.renderCategory}
					renderHowto={this.renderHowto}
				/>
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
		query: state.query,
		categoryHits: state.categoryHits,
		howtoHits: state.howtoHits,
		categoryNames: state.categoryNames
	}
}

const mapDispatchToProps = actionCreators

export default connect(mapStateToProps, mapDispatchToProps)(HowTo)