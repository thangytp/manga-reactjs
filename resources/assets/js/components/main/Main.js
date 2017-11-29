import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Home from './Home';
import Header from './Header';

export default class Main extends Component {
	render(){
		return (
				<div className="container">
					<Header />
					<Switch>
		    			<Route exact path='/' component={Home}/>	    			
					</Switch>
				</div>
			)
	}
}