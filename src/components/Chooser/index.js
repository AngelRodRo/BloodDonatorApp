import React from 'React';
import { browserHistory } from 'react-router';
	
class Chooser extends React.Component{
	
	constructor(){
		super();
		this.isDonor = this.isDonor.bind(this)
	}

	isDonor(value){
		let donor = this.props.route.donor;
		localStorage.isChecked = true;
		localStorage.isDonor = value;
    	browserHistory.push('/map');

		donor(value);
	}

	render(){
		return (
			<div className="container">
				<h1> ¿Do you wanna donate blood or search a donor? </h1>
				<button onClick={() => this.isDonor(false) } className="btn btn-primary">I'm search a donnor</button>
				<button onClick={() => this.isDonor(true)} className="btn btn-primary">I wanna donate my blood</button>
			</div>
		);
	}

}

export default Chooser;
