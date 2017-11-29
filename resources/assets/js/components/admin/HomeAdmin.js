import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

export default class HomeAdmin extends Component {
	componentDidMount(){
		document.title = 'Manga portal';
	}
	render(){
		return (
				<div>
	                <h2>Manga Portal</h2>

	                <div className="line"></div>

	                <h3>Author: Thang Pham</h3>

	                <div className="line"></div>
				</div>
			)
	}
}