import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, Col, Row } from 'react-bootstrap';
import swal from 'sweetalert';

class PostModal extends React.Component{
	
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
		          	<PostForm post={this.props.post} socket={this.props.socket} />
		 	      </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.props.close}>Close</Button>
		          </Modal.Footer>
		        </Modal>
	        </div>
		)

	}
}

class PostForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			_id: this.props.post._id,
			firstName:this.props.post.firstName,
			lastName:this.props.post.lastName,
			contactNumber:this.props.post.contactNumber,
			email:this.props.post.email,
			address:this.props.post.address,
			bloodGroup:this.props.post.bloodGroup
		};

		this.editPost = this.editPost.bind(this);
		this.deletePost = this.deletePost.bind(this);

		this.handleChange = this.handleChange.bind(this)
		this.getValue = this.getValue.bind(this)
		this.socket = this.props.socket;
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


	editPost(e){
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
		let id = this.state._id

		fetch("/api/posts/"+id,{
			method: "PUT",
			headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
		  	},
			body:JSON.stringify(data)
		}).then( (res) =>{
			return res.json().then((res) => {

				swal("Good job!", "You updated your post for donation!", "success")
				this.socket.emit("update post",{ id:id,latitude:data.latitude,longitude :data.longitude });
	        });

		});
	}

	deletePost(){
		let id = this.state._id

		fetch("/api/posts/"+id,{
			method: "DELETE",
			headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
		  	}
		}).then( (res) =>{
			return res.json().then((res) => {

				swal("Good job!", "You delete your post for donation!", "success")
				this.socket.emit("delete post",{ id:id });
	        });

		});

	}

	getValue(){
		let input = this.textInput;
		console.log(this.textInput)
	}

	render(){
		return(
				<form >
					<Row>
						<input type="hidden" value={this.state._id} />
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
						<Col md={6}>
							<Button
								className="btn btn-primary"
								onClick={this.editPost}
							>
								Edit post
							</Button>
						</Col>
						<Col md={6}>
							<Button
								className="btn btn-primary"
								onClick={this.deletePost}
							>
								Delete post
							</Button>
						</Col>

					</Row>
				</form>
		);	
	}

}

export default PostModal;