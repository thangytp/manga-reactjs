import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
// The Roster component matches one of two different routes
// depending on the full pathname
export default class Header extends Component {
	render(){
		return(
			<header>
				<div className="header-top">
					<a href="/" title="Manga, comic online" className="header-title">Manga.com</a>
				</div>
				<div className="search">
					<form className="form">
						<input type="text" className="form-control" />
					</form>
				</div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">Manga</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Truyện hot</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Truyện mới</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Đọc nhiều</a>
							</li>
						</ul>
						
					</div>

				</nav>
			</header>
		)
	}
}