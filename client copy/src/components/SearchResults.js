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


export default class SearchResults extends React.Component {
	constructor(props) {
		super(props);


		this.renderBook = this.renderBook.bind(this);
		this.renderLibrary = this.renderLibrary.bind(this);
	};

	renderBook(book) {
		return (
			<div class="col-auto mb-3">{book}</div>
		);
	}

	renderLibrary() {
		this.props.books.forEach(renderBook)
		return this.props.books;
	}


	render() {
		return (
			<div className="SearchResults">
				<div class="container">
					<Jumbotron>
						<div className="row justify-content-center">
							{this.renderLibrary()}
						</div>
					</Jumbotron>
				</div>
		</div>
		);
	};
};
