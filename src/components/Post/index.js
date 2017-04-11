import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, Col, Row } from 'react-bootstrap';
import swal from 'sweetalert';

class DonorModal extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		}	
	}

	render(){
		return(
			<div>
				<Modal show={this.props.open} onHide={this.props.close}>
		          <Modal.Header closeButton>
		            <Modal.Title>Information Contact</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<DonorForm post={this.props.post} />
		 	      </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.props.close}>Close</Button>
		          </Modal.Footer>
		        </Modal>
	        </div>
		)

	}
}

class DonorForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			firstName:'',
			lastName:'',
			contactNumber:'',
			email:'',
			address:'',
			bloodGroup:''
		};

		this.addDonor = this.addDonor.bind(this);
		this.handleChange = this.handleChange.bind(this)
		this.getValue = this.getValue.bind(this)
	}
	
	getSavedLocation(){

	    let rawLocation = localStorage.position,
	        myPosition = rawLocation? JSON.parse(rawLocation):"";

	    return myPosition;
  	}

  	handleChange(event){
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });

	}

	addDonor(e){
		e.preventDefault();
		e.stopPropagation();
		var data = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			contactNumber: this.state.contactNumber,
			email: this.state.email,
			address: this.state.address,
			bloodGroup: this.state.bloodGroup
		};

		var latLng = this.getSavedLocation();
		data.latitude = latLng.latitude;
		data.longitude = latLng.longitude;
		let newPost = this.props.post;

		fetch("/api/posts",{
			method: "POST",
			headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
		  	},
			body:JSON.stringify(data)
		}).then( (res) =>{
			return res.json().then((res) => {
				data.link = location.origin + '/map?post=' + res.id;
				newPost(data);
				swal("Good job!", "You added a new post for donation!", "success")
	        });

		});


	}

	getValue(){
		let input = this.textInput;
		console.log(this.textInput)
	}

	render(){
		return(
				<form onSubmit={this.addDonor} >
					<Row>
						<Col md={6}>
							<FormGroup>
								<ControlLabel> First Name </ControlLabel>
								<FormControl
									type="text"
									name="firstName"
									placeholder="First Name"
									value={this.state.firstName}
									onChange={this.handleChange}
									ref={(input)=>{ this.textInput = input; }}

								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<ControlLabel> Last Name </ControlLabel>
								<FormControl
									type="text"
									name="lastName"
									placeholder="Last Name"
									value={this.state.lastName}
									onChange={this.handleChange}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<ControlLabel> Contact Number </ControlLabel>
								<FormControl
									type="text"
									name="contactNumber"
									placeholder="Contact Number"
									value={this.state.contactNumber}
									onChange={this.handleChange}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<ControlLabel> Email </ControlLabel>
								<FormControl
									type="email"
									name="email"
									placeholder="Email"
									onChange={this.handleChange}
									value={this.state.email}
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<FormGroup>
								<ControlLabel> Address</ControlLabel>
								<FormControl
									type="text"
									name="address"
									placeholder = "Address"
									onChange={this.handleChange}
									value={this.state.address}
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<FormGroup>
								<ControlLabel>Blood Group</ControlLabel>
								<FormControl
									type="text"
									name="bloodGroup"
									onChange={this.handleChange}
									placeholder = "Blood Group"
									value={this.state.bloodGroup}
								/>
							</FormGroup>
						</Col>
						
					</Row>
					<Row>
						<Col md={12}>
							<Button
								className="btn btn-primary"
								type="submit"
							>
								Add a new post
							</Button>
						</Col>

					</Row>
				</form>
		);	
	}

}

export default DonorModal;