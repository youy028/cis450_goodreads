import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RareGems extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rareGems: []
		};
	};


	componentDidMount() {
		fetch(`http://localhost:8081/explore/raregems`,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(books => {
			if (!books) return;
			const books2 = books.map((bookObj, i) => [bookObj.bookname, bookObj.bookid]);
			this.setState({
				rareGems: books2
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
							<h1 className="display-5">Rare Gems</h1>
							{this.state.rareGems.map((item, i)=>(<p>{i+1}. {item[0]}</p>))}
						</div>
					</div>
				</div>
			</div>
		);
	};
};
