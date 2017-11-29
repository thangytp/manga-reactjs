import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Main from './main/Main';
import MainAdmin from './admin/MainAdmin';

export default class App extends Component {
	render(){
		return (
			<main>
				<Switch>
					<Route path='/' exact component={Main} />
			      	<Route path='/admin' component={MainAdmin} />
			    </Switch>
		    </main>
			)
	}
}