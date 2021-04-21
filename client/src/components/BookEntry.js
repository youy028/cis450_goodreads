import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
export default class BookEntry extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<Card style={{ width: '12rem'}}>
			  <Card.Img variant="top" src={this.props.imgPath} />
			  <Card.Body>
			    <Card.Title>{this.props.name}</Card.Title>
			  </Card.Body>
			</Card>
		);
	};
};
