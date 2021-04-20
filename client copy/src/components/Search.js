import React from 'react';
import PageNavbar from './PageNavbar';
import BestMoviesRow from './BestMoviesRow';
import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			queryString: ""
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


	// <div class="input-group mb-3">
	//   <input type="text" class="form-control" placeholder="Enter Book Name">
	//   <div class="input-group-append">
	//     <span class="input-group-text" id="basic-addon2">submit</span>
	//   </div>
	// </div>
	// <div className="input-container">
	// 	<input type='text' placeholder="Enter Book Name" value={this.state.queryString} onChange={this.handleQueryStringChange} id="queryString" className="query-string"/>
	// 	<button id="submitBookQuery" className="btn btn-secondary btn-sm" href="/search/hello">Submit</button>
	// </div>

	render() {
		return (
			<div className="Search">
				<PageNavbar active="search" />

				<div class="p-3">
					<div class="container">
						<div class="input-group mb-3">
							<input type="text" class="form-control" placeholder="Enter book name"/>
							<div class="input-group-append">
								<span class="btn btn-secondary" href="/search/hello">submit</span>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	};
};
