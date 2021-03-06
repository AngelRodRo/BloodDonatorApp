import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, Col, Row } from 'react-bootstrap';

class DonorSuccessModal extends React.Component{

	constructor(props){
		super(props);
		this.state= {
			show:false
		}

	}

	render(){
		let close = () => this.setState({show:false})
		return(
			<div>
				<Modal show={this.props.open} onHide={this.props.close}>
		          <Modal.Header closeButton>
		            <Modal.Title>Information Contact</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<Row>	
		          		<Col md={6}>
				          	<h4>First Name</h4>
				          	<p>{this.props.post.firstName} </p>
		          		</Col>
		          		<Col md={6}>
				          	<h4>Last Name</h4>
				          	<p>{this.props.post.lastName} </p>		          			
		          		</Col>
		          	</Row>
		          	<Row>
		          		<Col md={6}>
		          			<h4> Contact Number </h4>
		          			<p> {this.props.post.contactNumber} </p>
		          		</Col>
		          		<Col md={6}>
		          			<h4> Email </h4>
		          			<p> {this.props.post.contactNumber} </p>
		          		</Col>
		          	</Row>
		          	<Row>
		          		<Col md={12}>
		          			<h4> Direccion </h4>
		          			<p>
		          				{this.props.post.address}
		          			</p>
		          		</Col>
		          	</Row>
		          	<Row>
		          		<Col md={12}>
		          			<h4> Link for edit </h4>
		          			<p>
		          				{this.props.post.link}
		          			</p>
		          		</Col>		          	
		          	</Row>

		 	      </Modal.Body>
		 	      <Modal.Footer>
					<Button onClick={this.props.close} className="btn btn-primary">Accept</Button>		          			
		 	      </Modal.Footer>
		        </Modal>
	        </div>
		)
	}
}

export default DonorSuccessModal;