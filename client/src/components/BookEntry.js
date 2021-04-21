import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/BookEntry.css'
import Card from 'react-bootstrap/Card'

// <div class="p-3">
// 	<div className="BookEntry">
// 		<div class="col text-center">
// 			<img src={this.props.imgPath} width="auto" height="180"/>
// 			<div class="p-2">
// 				<h5> {this.props.name} </h5>
// 			</div>
// 		</div>
// 	</div>
// </div>

//<Card style={{width: '12rem'}}>
export default class BookEntry extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<Card className="bookCard">
			  <Card.Img className="bookImg" variant="top" src={this.props.imgPath}/>
			  <Card.Body>
			    <Card.Title>{this.props.name}</Card.Title>
					<Card.Subtitle className="text-muted">{this.props.author}</Card.Subtitle>
			  </Card.Body>
			</Card>
		);
	};
};
