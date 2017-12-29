import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeAdmin from './HomeAdmin';
import Header from './Header';
import SideBar from './SideBar';
import AddManga from './manga/AddManga';
import ListManga from './manga/ListManga';
import DetailManga from './manga/DetailManga';

import AddChapter from './chapter/AddChapter';
import AddMultiChapter from './chapter/AddMultiChapter';
import ListChapter from './chapter/ListChapter';
import EditChapter from './chapter/EditChapter';

// The Roster component matches one of two different routes
// depending on the full pathname
export default class MainAdmin extends Component {
  	render(){
  		return(
  			<div className="wrapper">
  				<SideBar />
  				<div className="right-content">
  					<Header />
  					<div id="content">
				  		<Switch>
				    		<Route exact path='/admin' component={HomeAdmin}/>
				    		<Route path='/admin/add-manga' component={AddManga}/>
				    		<Route path='/admin/list-manga' component={ListManga}/>
				    		<Route path='/admin/detail-manga/:id' component={DetailManga}/>
				    		<Route path='/admin/add-chapter' component={AddChapter}/>
				    		<Route path='/admin/add-multi-chapter' component={AddMultiChapter}/>
				    		<Route path='/admin/list-chapter' component={ListChapter}/>
				    		<Route path='/admin/edit-chapter/:id' component={EditChapter}/>
						</Switch>
					</div>
				</div>
			</div>
		)
	}
}
