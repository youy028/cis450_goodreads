import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MostPopularBooks extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popularBooks: []
		};

		// this.submitDecadeGenre = this.submitDecadeGenre.bind(this);
	};


	componentDidMount() {
		const books = ["harry potter", "gone in the wind"];
		let popularBooksTest = books.map((book, i) => {
			return <p className="PopularBookRow" key={i}> {book} </p>
		});

		this.setState({
			popularBooks: popularBooksTest
		});

	};

	render() {
		return (
			<div className="PopularBooks">
				<div className="p-3">
					<div className="jumbotron">
						<div className="container-fluid">
							<h1 className="display-5">Most Popular</h1>
							{this.state.popularBooks}
						</div>
					</div>
				</div>
			</div>
		);
	};
};
