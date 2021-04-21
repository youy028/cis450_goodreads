import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Quotes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			queryString: "",
			results: []
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


	// submitQuoteQuery() {
	// 	fetch("http://localhost:8081/quotes/" + this.state.movieName,
	// 	{
	// 		method: 'GET' // The type of HTTP request.
	// 	}).then(res => {
	// 		// Convert the response data to a JSON.
	// 		return res.json();
	// 	}, err => {
	// 		// Print the error if there is one.
	// 		console.log(err);
	// 	}).then(recommendedMovies => {
	// 		if (!recommendedMovies) return;
	// 		// Map each keyword in this.state.keywords to an HTML element:
	// 		// A button which triggers the showMovies function for each keyword.
	// 		const recommendedMoviesDivs = recommendedMovies.map((recommendedMovieObj, i) =>
	// 			<RecommendationsRow
	// 				title={recommendedMovieObj.title}
	// 				id={recommendedMovieObj.movie_id}
	// 				rating={recommendedMovieObj.rating}
	// 				votes={recommendedMovieObj.num_ratings}
	// 			/>
	// 		);
	// 		// Set the state of the keywords list to the value returned by the HTTP response from the server.
	// 		this.setState({
	// 			recMovies: recommendedMoviesDivs
	// 		});
	// 	}, err => {
	// 		// Print the error if there is one.
	// 		console.log(err);
	// 	});
	// };



	render() {
		return (
			<div className="Search">
				<PageNavbar active="quotes" />

				<div className="p-3">
					<div className="container">
						<div className="input-group mb-3">
							<input type="text" className="form-control" placeholder="Enter book name"/>
							<div className="input-group-append">
								<span className="btn btn-secondary">Search by Tag</span>
								<span className="btn btn-secondary">Search by Content</span>
								<span className="btn btn-secondary">Popular quotes under genre</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
};
