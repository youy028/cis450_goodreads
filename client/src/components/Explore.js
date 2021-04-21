import React from 'react';
import MostPopularBooks from './Explore_components/MostPopularBooks';
import PageNavbar from './PageNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Explore extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};

		// this.submitDecadeGenre = this.submitDecadeGenre.bind(this);
		this.handleQueryStringChange = this.handleQueryStringChange.bind(this);
	};

	/* ---- Q3a (Best Movies) ---- */
	componentDidMount() {
	};



	handleQueryStringChange(e) {
		this.setState({
			queryString: e.target.value
		});
	};

	render() {
		return (
			<div className="Explore">
				<PageNavbar active="explore" />
				<div className="container">
					<div className="row align-items-start">
						<div className="col">
							<MostPopularBooks/>
						</div>
						<div className="col">
							<MostPopularBooks/>
						</div>
					</div>
				</div>
			</div>
		);
	};
};
