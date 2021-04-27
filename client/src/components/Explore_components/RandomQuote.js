import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RandomQuote extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			content: "",
			author: "",
			bookname: ""
		};
	};


	componentDidMount() {
		fetch(`http://localhost:8081/explore/randomquote`,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(books => {
			if (!books) return;
			// const books2 = books.map((bookObj, i) => [bookObj.coverUrl, bookObj.bookname, bookObj.author, bookObj.bookid]);
			this.setState({
				content: books[0].content,
				author: books[0].author,
				bookname: books[0].bookname
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
							<h1 className="display-5">quote</h1>
							{this.state.content}
							<p style={{textAlign: 'right'}}>
								{this.state.author}, <i>{this.state.bookname}</i>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	};
};
