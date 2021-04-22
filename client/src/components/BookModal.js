import React from 'react';
import {Modal, Button} from 'react-bootstrap';


export default class BookModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		}

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	};

	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}


	render() {
		return (
			<div>
				<Button variant="secondary" onClick={this.handleOpenModal}>open</Button>
				<Modal show={this.state.showModal}
							 onHide={this.handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
	        </Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleCloseModal}>Close</Button>
           	<Button variant="primary" onClick={this.handleCloseModal}>Save Changes</Button>
         	</Modal.Footer>
				</Modal>
			</div>
    );
	};
};
