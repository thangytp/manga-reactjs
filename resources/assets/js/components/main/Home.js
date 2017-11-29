import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

// The Roster component matches one of two different routes
// depending on the full pathname
export default class Home extends Component {
	componentDidMount() {
	    document.title = "Amazing Page";
	}

  	render(){
  		return(
  			<div>
	  			<p>Home user render</p>
	  		</div>
		)
	}
}
