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
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

export default class DetailManga extends Component {
	constructor(props) {
		super(props);
		this.state = {idToDel: '', manga: true, name: '', slug: '', other_name: '', status: '', description: '', cover: '', chapters: ''};

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeSlug = this.handleChangeSlug.bind(this);
		this.handleChangeOtherName = this.handleChangeOtherName.bind(this);
		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleChangeCover = this.handleChangeCover.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.alertSuccess = this.alertSuccess.bind(this);
		this.alertError = this.alertError.bind(this);

		this.showModal = this.showModal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount(){
		
		console.log(this.props.match.params.id);

		axios.get('/mangas/'+this.props.match.params.id)
			.then(response => {
				console.log(response);
				if(response.data.code !== 200){
					this.setState({ manga: false });
					this.alertError({title: 'Error', text: response.data.message});
				} else {
					let data = response.data.data;
					this.setState({
						name: data.manga.name,
						slug: data.manga.slug,
						other_name: data.manga.other_name || '',
						status: data.manga.status,
						description: data.manga.description || '',
						cover: data.manga.cover,
						chapters: data.chapters
					});
					document.title = 'Detail - '+data.name;
				}
		})
		.catch(function (error) {
			console.log(error);
		})
	}

	alertSuccess (payload) {
	    this.container.success(
	      	payload.text,
	      	payload.title, {
	      	timeOut: 5000,
	      	extendedTimeOut: 3000
	    });
  	}
  	alertError (payload) {
	    this.container.error(
	      	payload.text,
	      	payload.title, {
	      	timeOut: 5000,
	      	extendedTimeOut: 3000
	    });
  	}

  	handleChangeName(e){
		this.setState({
			name: e.target.value
		});
	}
	handleChangeSlug(e){
		this.setState({
			slug: e.target.value
		})
	}
	handleChangeOtherName(e){
		this.setState({
			other_name: e.target.value
		})
	}
	handleChangeStatus(e){
		this.setState({
			status: e.target.value
		})
	}
	handleChangeDescription(e){
		this.setState({
			description: e.target.value
		})
	}
	handleChangeCover(e){
		this.setState({
			cover: e.target.value
		})
	}

	handleSubmit(e){
		e.preventDefault();
		console.log('update manga');
		const manga = {
			name: this.state.name,
			slug: this.state.slug,
			other_name: this.state.other_name,
			status: this.state.status,
			description: this.state.description,
			cover: this.state.cover
		}
		let uri = '/mangas/';
		axios.put(uri+this.props.match.params.id, manga).then((response) => {
			console.log(response);
			if(response.data.code === 200){
				this.alertSuccess({title: 'Success', text: response.data.message});
			} else {
				this.alertError({title: 'Error', text: response.data.message});
			}
			// browserHistory.push('/display-item');
		});
	}

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
		if(this.state.manga){
			let chapterList = '';
			if(this.state.chapters instanceof Array){
				chapterList = this.state.chapters.map((chapter, index) => {
					return (
							<tr key={index}>
								<td>{chapter.chap}</td>
								<td>{chapter.name}</td>
								<td>{chapter.status}</td>
								<td className="action">
									<Link to="/" className="pR10"><i className="fa fa-eye"></i></Link>
									<Link to={"/admin/edit-chapter/"+chapter.id}><i className="fa fa-pencil"></i></Link>
								</td>
							</tr>
						);
				});
			}
			return(
					<div >
						<Breadcrumb activePage="Detail manga" />
						<div className="card">
							<div className="card-body">
				                <h1>Detail manga</h1>

						        <div className="row">
						          	<div className="col-10"></div>
					          		<div className="col-2">
					            		<Link to={"/admin/add-chapter?manga="+ this.props.match.params.id} className="btn btn-info pull-right">Add Chapter</Link>
					          		</div>
					        	</div>

					        	<form onSubmit={this.handleSubmit} className="form-horizontal">
									<div className="form-group row">
										<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="inputEmail3" placeholder="Tây Du" 
												onChange={this.handleChangeName}
												value={this.state.name}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Slug</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="inputPassword3" placeholder="/tay-du-chap-1" 
												onChange={this.handleChangeSlug}
												value={this.state.slug}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Other Name</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="inputEmail3" placeholder="To the West" 
												onChange={this.handleChangeOtherName}
												value={this.state.other_name}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="status" placeholder="Hot, New" 
												onChange={this.handleChangeStatus}
												value={this.state.status}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Description</label>
										<div className="col-sm-10">
											<textarea className="form-control" onChange={this.handleChangeDescription} rows="5" value={this.state.description}></textarea>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Cover</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="inputEmail3" placeholder="http://mangak.info/wp-content/uploads/2014/08/black-haze-187x250.jpg"
												onChange={this.handleChangeCover}
												value={this.state.cover}
											/>
										</div>
									</div>
									<div className="form-group row">
										<div className="col-md-10 offset-md-2">
											<button className="btn btn-info">Update</button>
										</div>
									</div>
								</form>

								<div id="list-chap" className="col-xs-12">
									<table className="table table-hover">
										<thead>
											<tr>
												<th>Chap</th>
												<th>Name</th>
												<th>Status</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{chapterList}
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<ToastContainer ref={(input) => {this.container = input;}}
	                        toastMessageFactory={ToastMessageFactory}
	                        className="toast-top-right"
	                        preventDuplicates={true} />

			        	<div id="myModal" className="modal fade" role="dialog">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<button type="button" className="close" data-dismiss="modal">&times;</button>
										<h4 className="modal-title">Delete chapter</h4>
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
				);
		} else {
			return(
					<div>
						<Breadcrumb activePage="Detail manga" />
						<div className="row">
							<div className="col-sm-12">
							<p style={{fontSize:40+'px'}} className="text-center">404</p>
							</div>
							<div className="col-sm-12">
							<p className="text-center" style={{fontSize:40+'px'}}>No data</p>
							</div>
						</div>
						<ToastContainer ref={(input) => {this.container = input;}}
		                        toastMessageFactory={ToastMessageFactory}
		                        className="toast-top-right"
		                        preventDuplicates={true} />
					</div>
				);
		}
	}
}