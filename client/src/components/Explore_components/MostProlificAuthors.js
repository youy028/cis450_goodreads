import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MostProlificAuthors extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			prolificAuthors: []
		};
	};


	componentDidMount() {
		fetch(`http://localhost:8081/explore/mostprolific`,
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
					prolificAuthors: authors2
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
							<h1 className="display-5">Most Prolific Authors</h1>
							{this.state.prolificAuthors.map((item, i)=>(<p>{i+1}. {item}</p>))}
						</div>
					</div>
				</div>
			</div>
		);
	};
};
