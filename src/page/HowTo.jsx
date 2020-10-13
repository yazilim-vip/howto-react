import React from "react";

import Page from "../component/Page";
import HowToBrowser from "../component/howto/HowToBrowser";
import Firebase from "../util/Firebase";
import { connect } from "react-redux";
import { actionCreators } from "../redux/actions";
import { Alert, Spinner } from "react-bootstrap";
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
						if (snapshot.exists()) {
							const val = snapshot.val()
							const json = val.substring(1, val.length - 1)

							this.serviceSuccessHandler(JSON.parse(json), this.props.match.params[0])
						} else {
							this.props.onApiError("Snapshot can not found on firebase.")
						}
					},
					error => {
						this.props.onApiError(error)
					}
				)
		}
	}

	serviceSuccessHandler = (data, path) => {
		this.props.onApiSuccess(data)
		this.props.onPathChange(path)
	}

	renderInfoPage = (content) => {
		return (
			<Page>
				<div className="row h-100 text-center">
					<div className="col-sm-12 my-auto">
						{content}
					</div>
				</div>
			</Page>)
	}

	render() {
		const { error, isLoaded } = this.props;

		if (!isLoaded) {
			return this.renderInfoPage(<Spinner animation="border" />)
		}

		if (error) {
			return this.renderInfoPage(
				<Alert key={1} variant={"danger"}>
					{error}
				</Alert>
			)
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