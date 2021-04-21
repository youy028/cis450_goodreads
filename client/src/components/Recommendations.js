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
			bookQueryStr: "",
			authorQueryStr: "",
			countryQueryStr: "",
			genreQueryStr: "",
			bookQueryRes: [],
			authorQueryRes: [["https://images-na.ssl-images-amazon.com/images/I/41XMaCHkrgL._SX326_BO1,204,203,200_.jpg", "gatsby"], ["book1.jpg", "mockingbird"]],
			countryQueryRes: [],
			genreQueryRes: []
		};

		this.handleBookChange = this.handleBookChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.submitSearchByBook = this.submitSearchByBook.bind(this);
		this.submitSearchByAuthor = this.submitSearchByAuthor.bind(this);
		this.submitSearchByCountry = this.submitSearchByCountry.bind(this);
	};

	handleBookChange(e) {
		this.setState({bookQueryStr: e.target.value});
	}

	handleAuthorChange(e) {
		this.setState({authorQueryStr: e.target.value});
	}

	handleCountryChange(e) {
		this.setState({countryQueryStr: e.target.value});
	}

	handleGenreChange(genre) {
		this.setState({genreQueryStr: genre});
	}

	submitSearchByBook() {
		fetch(`http://localhost:8081/recommendations/bybook/${this.state.bookQueryStr}`,
		{
			method: 'GET' // The type of HTTP request.
		}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
		}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(books => {
			if (!books) return;
			const books2 = books.map((bookObj, i) => [bookObj.coverUrl, bookObj.bookname, bookObj.author]);
			this.setState({
				bookQueryRes: books2
			});
		}, err => {
			console.log(err);
		});
	}

	submitSearchByAuthor() {

	}

	submitSearchByCountry() {

	}

	render() {
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations"/>
					<br/>
					<div className="container">
						<Jumbotron>
							<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={(key,event)=>this.setState({activeTab: parseInt(key)})}>
								<Tab eventKey={1} title="By Book">
									<SearchBar id="byBookBar"
										placeholder="Enter Book"
										handleChange={this.handleBookChange}
										submitFunc={this.submitSearchByBook}/>
								</Tab>
								<Tab eventKey={2} title="By Author">
									<SearchBar id="byAuthorBar"
										placeholder="Enter Author"
										handleChange={this.handleAuthorChange}
										submitFunc={this.submitSearchByAuthor}/>
								</Tab>
								<Tab eventKey={3} title="By Country">
									<SearchBar id="byCountryBar"
										placeholder="Enter Country"
										handleChange={this.handleCountryChange}
										submitFunc={this.submitSearchByCountry}/>
								</Tab>
								<Tab eventKey={4} title="By Genre">
									<div className="container">
										<div className="row">
											<div className="col text-center">
												<GenresDropdown handleChange={this.handleGenreChange}/>
											</div>
										</div>
									</div>
								</Tab>
						  </Tabs>
						</Jumbotron>
					</div>

				<div className="container">
					<Jumbotron>
						<div className="row justify-content-center">
							{(this.state.bookQueryRes)
								.map((item, i)=><div className="col-auto mb-3"><BookEntry imgPath={item[0]} name={item[1]} author={item[2]}/></div>)}
						</div>
					</Jumbotron>
				</div>
		</div>
		);
	};
};
