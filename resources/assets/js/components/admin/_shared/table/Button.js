import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

export default class Button extends Component {

	constructor(props){
		super(props);
	}
	componentDidMount(){
		
	}

	render(){
		return (
				<td colSpan="2">
					<Link to={this.props.link + this.props.id} className="btn btn-xs btn-info"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
					<Link to="" className="btn btn-xs btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></Link>
				</td>
			)
	}
}