import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

export default class Header extends Component {
	
	render(){
		return (
				<header>
					<nav className="navbar navbar-default">
	                    <div className="container-fluid">

	                        <div className="navbar-header">
	                            <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
	                                <i className="fa fa-bars"></i>
	                                <span></span>
	                            </button>
	                        </div>
	                        <div className="user">
	                        	<ul className="manga-navbar-nav">
	                        		<li className="nav-item dropdown">
	                        			<a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								          	Hi, Admin!
								        </a>
								        <div className="manga-dropdown-menu dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
								          	<a className="dropdown-item" href="#"><i className="fa fa-user-o" aria-hidden="true"></i> My profile</a>
								          	<a className="dropdown-item" href="#"><i className="fa fa-cog" aria-hidden="true"></i> Change password</a>
								          	<div className="dropdown-divider"></div>
								          	<Link className="dropdown-item" to="/logout"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link>
								        </div>
	                        		</li>
	                        	</ul>
	                        </div>
	                    </div>
	                </nav>
				</header>
			)
	}
}