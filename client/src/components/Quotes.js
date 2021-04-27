import React from 'react';
import {Tabs, Tab, Jumbotron, Card} from 'react-bootstrap'

import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PageNavbar from './PageNavbar';
import SearchBar from './SearchBar';
import GenresDropdown from './GenresDropdown';

export default class Quotes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: 1,
			tagQueryStr: "",
			contentQueryStr: "",
			tagQueryRes: [],
			genreQueryRes: []
		};

		this.handleTagChange = this.handleTagChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);

		this.submitSearchByTag = this.submitSearchByTag.bind(this);
		this.submitSearchByGenre = this.submitSearchByGenre.bind(this);

		this.getActiveQueryRes = this.getActiveQueryRes.bind(this);
		this.renderQuote = this.renderQuote.bind(this);

		this.renderResults = this.renderResults.bind(this);
	};

	/* ---- Q3a (Best Movies) ---- */
	componentDidMount() {

	};

	getActiveQueryRes() {
		if (this.state.activeTab==1) return this.state.tagQueryRes;
		else return this.state.genreQueryRes;
	}

	handleTagChange(e) {
		this.setState({tagQueryStr: e.target.value});
	}

	handleGenreChange(genre) {
		this.submitSearchByGenre(genre);
	}

	submitSearchByTag() {
		fetch(`http://localhost:8081/quotes/bytags/${this.state.tagQueryStr}`,
		{
			method: 'GET' // The type of HTTP request.
		}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
		}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(quotes => {
			if (!quotes) return;
			const quotes2 = quotes.map((quoteObj, i) => [quoteObj.content, quoteObj.author, quoteObj.bookname]);
			this.setState({
				tagQueryRes: quotes2
			});
		}, err => {
			console.log(err);
		});
	}


	submitSearchByGenre(genre) {
		fetch(`http://localhost:8081/quotes/bygenre/${genre}`,
		{
			method: 'GET' // The type of HTTP request.
		}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
		}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(quotes => {
			if (!quotes) return;
			const quotes2 = quotes.map((quoteObj, i) => [quoteObj.content, quoteObj.author, quoteObj.bookname]);
			this.setState({
				genreQueryRes: quotes2
			});
		}, err => {
			console.log(err);
		});
	}

	renderQuote(content, author, book, key) {
		return (
			<Card className="mb-3" key={key} style={{ width: '100%'}}>
			  <Card.Body>
			    <Card.Title>{content}</Card.Title>
			    <Card.Text className="text-muted" style={{float: `right`}}>
						<i>{book}</i>, by {author}
					</Card.Text>
			  </Card.Body>
			</Card>
		);
	}

	renderResults() {
		if (this.getActiveQueryRes().length <1) return;
		return (
			<div className="container">
				<Jumbotron>
					<div className="row justify-content-center">
						{this.getActiveQueryRes()
							.map((item, i)=>this.renderQuote(item[0],item[1],item[2], i))}
					</div>
				</Jumbotron>
			</div>
		);
	}


	render() {
		return (
			<div className="Search">
				<PageNavbar active="quotes" />
				<br/>
				<div className="container">
					<Jumbotron>
						<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={(key,event)=>this.setState({activeTab: parseInt(key)})}>
							<Tab eventKey={1} title="By Tags">
								<SearchBar id="byTagBar"
									placeholder="Enter Tags"
									handleChange={this.handleTagChange}
									submitFunc={this.submitSearchByTag}/>
							</Tab>
							<Tab eventKey={2} title="By Genre">
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
