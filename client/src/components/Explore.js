import React from 'react';
import MostPopularBooks from './Explore_components/MostPopularBooks';
import PageNavbar from './PageNavbar';
import '../style/BestMovies.css';
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
				<div class="container">
					<div class="row align-items-start">
						<div class="col">
							<MostPopularBooks/>
						</div>
						<div class="col">
							<MostPopularBooks/>
						</div>
					</div>
				</div>
			</div>
		);
	};
};
