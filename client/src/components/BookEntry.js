import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/BookEntry.css'
import {Card, Modal, Button} from 'react-bootstrap';

// import BookModal from './BookModal';


//<Card style={{width: '12rem'}}>
export default class BookEntry extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			rating: "",
			description: ""
		}

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.getBookDetail = this.getBookDetail.bind(this);
		this.renderBookDetail = this.renderBookDetail.bind(this);
	};

	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	getBookDetail() {
		fetch(`http://localhost:8081/book/${this.props.bookid}`,
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
			const books2 = books.map((bookObj, i) => [bookObj.rating, bookObj.description]);
			this.setState({
				rating: books2[0][0],
				description: books2[0][1]
			});
		}, err => {
			console.log(err);
		});
	}

	renderBookDetail() {
		if (this.state.rating=="") {this.getBookDetail()}
		return (
			<div>
				<div className="container">
					<div className="row align-items-start">
						<div className="col">
							<img src={this.props.imgPath} style={{borderRadius: '20px'}}/>
						</div>
						<div className="col">
							<h2><i>{this.props.name}</i></h2>
							<hr style={{borderTop: '3px solid #c0c0c0', borderRadius: '1px'}}/>
							<h5 className="text-muted">{this.props.author}</h5>
							<p>{"⭐".repeat(parseInt(this.state.rating))}</p>
							<p>{this.state.description}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="BookEntry">
				<Modal show={this.state.showModal}
							 onHide={this.handleCloseModal}
							 centered={true}
							 size="lg">
					<Modal.Header closeButton={true}/>
					<Modal.Body>{this.renderBookDetail()}</Modal.Body>
				</Modal>
				<Card className="bookCard" onClick={this.handleOpenModal}>
				  <Card.Img className="bookImg" variant="top" src={this.props.imgPath}/>
				  <Card.Body>
				    <Card.Title>{this.props.name}</Card.Title>
						<Card.Subtitle className="text-muted">{this.props.author}</Card.Subtitle>
				  </Card.Body>
				</Card>
			</div>
		);
	};
};
