import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

export default class Breadcrumb extends Component {

	render(){
		return (
				<ol className="breadcrumb">
				  	<li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
				  	<li className="breadcrumb-item active">{this.props.activePage}</li>
				</ol>
			);
	}
}