import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Button from './Button';

export default class TableRow extends Component {
	componentDidMount(){
		
	}
	render(){
		return (
				<tr>
					<td>
						{this.props.manga.id}
					</td>
					<td>
						{this.props.manga.name}
					</td>
					<td>
						{this.props.manga.slug}
					</td>
					<td>
						{this.props.manga.status}
					</td>
					<td>
						<img src={this.props.manga.cover} className="img-responsive img-thumbnail manga-img-thumbnail" alt={this.props.manga.name}/>
					</td>
					<Button id={this.props.manga.id} link={this.props.link}/>
				</tr>
			)
	}
}