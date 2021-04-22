import React from 'react';
import {Tabs, Tab, Jumbotron, Modal, Button} from 'react-bootstrap';

import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PageNavbar from './PageNavbar';
import GenresDropdown from './GenresDropdown';
import SearchBar from './SearchBar';
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
			authorQueryRes: [],
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

		this.getActiveQueryRes = this.getActiveQueryRes.bind(this);
		this.renderResults = this.renderResults.bind(this);
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

	getActiveQueryRes() {
		if (this.state.activeTab==1) return this.state.bookQueryRes;
		if (this.state.activeTab==2) return this.state.authorQueryRes;
		if (this.state.activeTab==3) return this.state.countryQueryRes;
		return this.state.genreQueryRes;
	}

	submitSearchByBook() {
		fetch(`http://localhost:8081/recommendations/bybook/${this.state.bookQueryStr}`,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(books => {
			if (!books) return;
			const books2 = books.map((bookObj, i) => [bookObj.coverUrl, bookObj.bookname, bookObj.author, bookObj.bookid]);
			this.setState({
				bookQueryRes: books2
			});
		}, err => {
			console.log(err);
		});
	}

	submitSearchByAuthor() {
		fetch(`http://localhost:8081/recommendations/byauthor/${this.state.authorQueryStr}`,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(books => {
			if (!books) return;
			const books2 = books.map((bookObj, i) => [bookObj.coverUrl, bookObj.bookname, bookObj.author, bookObj.bookid]);
			this.setState({
				authorQueryRes: books2
			});
		}, err => {
			console.log(err);
		});
	}

	submitSearchByCountry() {
		fetch(`http://localhost:8081/recommendations/bycountry/${this.state.countryQueryStr}`,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(books => {
			if (!books) return;
			const books2 = books.map((bookObj, i) => [bookObj.coverUrl, bookObj.bookname, bookObj.author, bookObj.bookid]);
			this.setState({
				countryQueryRes: books2
			});
		}, err => {
			console.log(err);
		});
	}

	renderResults() {
		if (this.getActiveQueryRes().length <1) return;
		return (
			<div className="container">
				<Jumbotron>
					<div className="row justify-content-center">
						{this.getActiveQueryRes()
							.map((item, i)=><div className="col-auto mb-3" key={i}><BookEntry imgPath={item[0]} name={item[1]} author={item[2]} bookid={item[3]}/></div>)}
					</div>
				</Jumbotron>
			</div>
		);
	}

	render() {
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations"/>
				<br/>
				<div className="container">
					<Jumbotron>
						<Tabs defaultActiveKey={1} id="searchtabs" onSelect={(key,event)=>this.setState({activeTab: parseInt(key)})}>
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
				{this.renderResults()}
		</div>
		);
	};
};
