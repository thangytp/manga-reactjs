import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

export default class SideBar extends Component{

	render(){
		return (
				<nav id="sidebar">
	                <div className="sidebar-header">
	                    <h3>Manga Portal</h3>
	                    <strong>M</strong>
	                </div>

	                <ul className="list-unstyled components">
	                    <li className="active">
	                        <Link to="/admin">
	                            <i className="fa fa-home" aria-hidden="true"></i>
	                            Home
	                        </Link>
	                    </li>
	                    <li>
	                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">
	                            <i className="fa fa-files-o"></i>
	                            Manga
	                        </a>
	                        <ul className="collapse list-unstyled" id="pageSubmenu">
	                            <li><Link to="/admin/add-manga">Add manga</Link></li>
	                            <li><Link to="/admin/list-manga">List manga</Link></li>
	                        </ul>
	                    </li>
	                    <li>
	                        <a href="#chapterSubmenu" data-toggle="collapse" aria-expanded="false">
	                            <i className="fa fa-link"></i>
	                            Chapter
	                        </a>
	                        <ul className="collapse list-unstyled" id="chapterSubmenu">
	                            <li><Link to="/admin/add-chapter">Add chapter</Link></li>
	                            <li><Link to="/admin/list-chapter">List chapter</Link></li>
	                        </ul>
	                    </li>
	                    <li>
	                        <a href="#">
	                            <i className="fa fa-paperclip"></i>
	                            FAQ
	                        </a>
	                    </li>
	                    <li>
	                        <a href="#">
	                            <i className="fa fa-paper-plane"></i>
	                            Contact
	                        </a>
	                    </li>
	                </ul>

	                <ul className="list-unstyled CTAs">
	                    <li><Link to="/" className="article">&copy; Manga.com</Link></li>
	                </ul>
	            </nav>
			);
	}
}