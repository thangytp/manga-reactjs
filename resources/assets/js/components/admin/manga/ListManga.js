import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import $ from 'jquery';

import TableRow from '../_shared/table/TableRow';
import Breadcrumb from '../_shared/Breadcrumb';


export default class ListManga extends Component {
	constructor(props) {
		super(props);
		this.state = {idToDel: '', mangas: ''};

		this.showModal = this.showModal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	componentDidMount(){
		
		document.title = 'All Manga';

		axios.get('/mangas')
			.then(response => {
				console.log(response);
				this.setState({ mangas: response.data });
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	// tabRow(){
	// 	if(this.state.mangas instanceof Array){
	// 		return this.state.mangas.map(function(manga, i){
	// 			return <TableRow manga={manga} key={i} link={'/manga/'} delete={this.handleDelete}/>;
	// 		})
	// 	}
	// }

	showModal(id){
		console.log(id);
		this.setState({
			idToDel: id
		});
		$('#myModal').modal('show');
	}

	handleDelete(id){
		console.log(id);
		axios.delete('/manga/'+id)
			.then(response => {
				// this.setState({ mangas: response.data });
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render(){

		let tableRows = <tr><td>No data</td></tr>;
		if(this.state.mangas instanceof Array){
			tableRows =  this.state.mangas.map((manga, i) => {
				return (
						<tr key={i}>
							<td>
								{manga.id}
							</td>
							<td>
								{manga.name}
							</td>
							<td>
								{manga.slug}
							</td>
							<td>
								{manga.status}
							</td>
							<td>
								<img src={manga.cover} className="img-responsive img-thumbnail manga-img-thumbnail" alt={manga.name}/>
							</td>
							<td colSpan="2">
								<Link to={'detail-manga/' + manga.id} className="btn btn-xs btn-info"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
								<a className="btn btn-xs btn-danger manga-btn" onClick={this.showModal.bind(this, manga.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>
							</td>
						</tr>
					);
			})
		}

		return (
				<div>
					<Breadcrumb activePage="All manga" />
					<div className="card">
						<div className="card-body">
			                <h1>List manga</h1>

					        <div className="row">
					          	<div className="col-md-10"></div>
				          		<div className="col-md-2">
				            		<Link to="/admin/add-manga" className="btn btn-info">Add</Link>
				          		</div>
				        	</div>

					        <table className="table table-hover">
					            <thead>
						            <tr>
						                <td>ID</td>
						                <td>Name</td>
						                <td>Slug</td>
						                <td>Status</td>
						                <td>Cover</td>
						                <td>Actions</td>
						            </tr>
					            </thead>
					            <tbody>
					            	{tableRows}
					            </tbody>
					        </table>
				       	</div>
			       	</div>

			        <div id="myModal" className="modal fade" role="dialog">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal">&times;</button>
									<h4 className="modal-title">Delete manga</h4>
								</div>
								<div className="modal-body">
									<p>Are you sure?</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this, this.state.idToDel)}>Delete</button>
									<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
	}
}