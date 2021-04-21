import React from 'react';
import {Tabs} from 'react-bootstrap'
import {Tab} from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import CardDeck from 'react-bootstrap/CardDeck'
import PageNavbar from './PageNavbar';
import GenresDropdown from './GenresDropdown';
import SearchBar from './SearchBar';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BookEntry from './BookEntry';


export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: 1,
			authorQueryStr: "",
			countryQueryStr: "",
			genreQueryStr: "",
			authorQueryRes: [["https://images-na.ssl-images-amazon.com/images/I/41XMaCHkrgL._SX326_BO1,204,203,200_.jpg", "gatsby"], ["book1.jpg", "mockingbird"]],
			countryQueryRes: [],
			genreQueryRes: []
		};

		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.submitSearchByAuthor = this.submitSearchByAuthor.bind(this);
		this.submitSearchByCountry = this.submitSearchByCountry.bind(this);
	};


	handleAuthorChange(e) {
		this.setState({authorQueryStr: e.target.value});
	}

	handleCountryChange(e) {
		this.setState({countryQueryStr: e.target.value});
	}

	handleGenreChange(genre) {
		this.setState({genreQueryStr: genre});
	}

	submitSearchByAuthor() {

	}

	submitSearchByCountry() {

	}

	// <div class="col-auto mb-3">
	// 	<BookEntry imgPath="https://images-na.ssl-images-amazon.com/images/I/41XMaCHkrgL._SX326_BO1,204,203,200_.jpg" name="testname" />
	// </div>
	// <div class="col-auto mb-3">
	// 	<BookEntry imgPath="book1.jpg" name="testname" />
	// </div>
	// <div class="col-auto mb-3">
	// 	<BookEntry imgPath="book1.jpg" name="testname" />
	// </div>
	// <div class="col-auto mb-3">
	// 	<BookEntry imgPath="book1.jpg" name="testname" />
	// </div>



	render() {
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations"/>
					<br/>
					<div class="container">
						<Jumbotron>
							<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={(key,event)=>this.setState({activeTab: parseInt(key)})}>
						    <Tab eventKey={1} title="By Author">
									<SearchBar id="byAuthorBar"
										placeholder="Enter Author"
										handleChange={this.handleAuthorChange}
										submitFunc={this.submitSearchByAuthor}/>
								</Tab>
								<Tab eventKey={2} title="By Country">
									<SearchBar id="byCountryBar"
										placeholder="Enter Country"
										handleChange={this.handleCountryChange}
										submitFunc={this.submitSearchByCountry}/>
								</Tab>
								<Tab eventKey={3} title="By Genre">
									<div class="container">
										<div class="row">
											<div class="col text-center">
												<GenresDropdown handleChange={this.handleGenreChange}/>
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
							{((this.state.activeTab===1) ? this.state.authorQueryRes : this.state.countryQueryRes)
								.map((item, i)=><div class="col-auto mb-3"><BookEntry imgPath={item[0]} name={item[1]}/></div>)}
						</div>
					</Jumbotron>
				</div>
		</div>
		);
	};
};
