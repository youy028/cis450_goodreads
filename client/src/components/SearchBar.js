import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);


	};

	// <div class="input-group mb-3">
	// 	<input type="text" class="form-control" placeholder={this.props.placeholder}/>
	// 	<div class="input-group-append">
	// 		<span class="btn btn-secondary" onClick={this.props.submitFunc}>submit</span>
	// 	</div>
	// </div>

	render() {
		return (
			<div className="p-3">
				<div className="container">
					<InputGroup className="mb-3">
						<FormControl placeholder={this.props.placeholder} onChange={this.props.handleChange}/>
						<InputGroup.Append>
							<Button variant="secondary" onClick={this.props.submitFunc}>submit</Button>
						</InputGroup.Append>
					</InputGroup>
				</div>
			</div>
		);
	};
};
