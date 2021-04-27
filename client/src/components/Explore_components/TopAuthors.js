import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TopAuthors extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			topAuthors: []
		};
	};


	componentDidMount() {
		fetch(`http://localhost:8081/explore/top10authors`,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(authors => {
			if (!authors) return;
			const authors2 = authors.map((authorObj, i) => authorObj.author);
			this.setState({
				topAuthors: authors2
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
							<h1 className="display-5">Top Authors</h1>
							{this.state.topAuthors.map((item, i)=>(<p>{i+1}. {item}</p>))}
						</div>
					</div>
				</div>
			</div>
		);
	};
};
