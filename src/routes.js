import React from 'react';
import { Router, Route } from 'react-router';

import Chooser from './components/Chooser';
import App from './components/App';
import About from './components/About';

class Routes extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			isDonor: false,
			isChoosed: false
		}
	}

	setDonor(value){
		console.log('entro aqui')
		this.setState({isDonor:value, isChoosed:true})
	}

	render(){
		return (
		  <Router history={this.props.history}>
		  	<Route path="/" component={Chooser} donor={(value)=>{ this.setDonor(value) }}  />
		    <Route path="/map" donor={this.state.isDonor} component={App} />
		    <Route path="/about" component={About} />
		  </Router>
	  	);
	}	
}


export default Routes;
