import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'

export default class GenresDropdown extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name, and the list of recommended movies.
		this.state = {
			selected: "",
			genres: []
		};

		this.handleSelect = this.handleSelect.bind(this);
	};

	handleSelect(eventKey, event) {
		this.setState({selected: eventKey});
		this.props.handleChange(eventKey);
	}

	componentDidMount() {
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/getallGenres",
		{
			method: 'GET' // The type of HTTP request.
		}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
		}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(genreList => {
			if (!genreList) return;
			const genres2 = genreList.map((genreObj, i) => genreObj.genre);
			this.setState({
				genres: genres2
			});
		}, err => {
			console.log(err);
		});
	};

	render() {
		return (
			<div class="p-3">
				<Dropdown>
					<Dropdown.Toggle variant="secondary" id="dropdown-basic">
						{this.state.selected.length<=0 ? "select genre" : this.state.selected}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{this.state.genres.map((g,i)=><Dropdown.Item eventKey={g} onSelect={this.handleSelect}>{g}</Dropdown.Item>)}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	};
};
