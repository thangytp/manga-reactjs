import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Breadcrumb from '../_shared/Breadcrumb';

export default class ListChapter extends Component {
	componentDidMount(){
		document.title = 'List Chapter';
	}
	render(){
		return (
				<div>
					<Breadcrumb activePage="All chapter" />
	                <h2>List chapter</h2>
				</div>
			)
	}
}