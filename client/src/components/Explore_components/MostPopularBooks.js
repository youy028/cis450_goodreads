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
		fetch(`http://localhost:8081/explore/mostpopularbooks`,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(books => {
			if (!books) return;
			const books2 = books.map((bookObj, i) => [bookObj.bookname]);
			this.setState({
				popularBooks: books2
			});
		}, err => {
			console.log(err);
		});
	};


	render() {
		return (
			<div className="PopularBooks">
				<div className="p-3">
					<div className="jumbotron">
						<div className="container-fluid">
							<h2 className="display-5">Most Popular</h2>
							{this.state.popularBooks.map((item, i)=>(<p>{i+1}. {item}</p>))}
						</div>
					</div>
				</div>
			</div>
		);
	};
};
