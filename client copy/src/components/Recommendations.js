import React from 'react';
import {Tabs} from 'react-bootstrap'
import {Tab} from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Dropdown from 'react-bootstrap/Dropdown'
import CardDeck from 'react-bootstrap/CardDeck'
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BookEntry from './BookEntry';


export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name, and the list of recommended movies.
		this.state = {
		};

		this.searchBar = this.searchBar.bind(this);
		this.onClickTest = this.onClickTest.bind(this);
		this.dropdownBut = this.dropdownBut.bind(this);
	};
	//

	onClickTest() {
		console.log("hii");
	}

	searchBar(message) {
		return (
			<div class="p-3">
				<div class="container">
					<div class="input-group mb-3">
						<input type="text" class="form-control" placeholder="Enter book name"/>
						<div class="input-group-append">
							<span class="btn btn-secondary" onClick={this.onClickTest}>submit</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	dropdownBut() {
		return (
			<div class="p-3">
				<Dropdown>
					<Dropdown.Toggle variant="secondary" id="dropdown-basic">
						Select genre
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>Action</Dropdown.Item>
						<Dropdown.Item>Another action</Dropdown.Item>
						<Dropdown.Item>Something else</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	}

	render() {
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations"/>
					<br/>
					<div class="container">
						<Jumbotron>
							<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
						    <Tab eventKey={1} title="By book">{this.searchBar()}</Tab>
								<Tab eventKey={2} title="By author">{this.searchBar()}</Tab>
								<Tab eventKey={3} title="By country">{this.searchBar()}</Tab>
								<Tab eventKey={4} title="By genre">
									<div class="container">
										<div class="row">
											<div class="col text-center">
												{this.dropdownBut()}
											</div>
										</div>
									</div>
								</Tab>
						  </Tabs>
						</Jumbotron>
					</div>

				<div class="container">
					<Jumbotron>
						<div className="row justify-content-center">
							<div class="col-auto mb-3">
								<BookEntry imgPath="book1.jpg" name="testname" />
							</div>
							<div class="col-auto mb-3">
								<BookEntry imgPath="book1.jpg" name="testname" />
							</div>
							<div class="col-auto mb-3">
								<BookEntry imgPath="book1.jpg" name="testname" />
							</div>
							<div class="col-auto mb-3">
								<BookEntry imgPath="book1.jpg" name="testname" />
							</div>
						</div>
					</Jumbotron>
				</div>
		</div>
		);
	};
};
