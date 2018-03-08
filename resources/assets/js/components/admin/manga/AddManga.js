import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

import Breadcrumb from '../_shared/Breadcrumb';
import Helper from '../_shared/Helper';

export default class AddManga extends Component {
	constructor(props){
		super(props);
		this.state = {name: '', slug: '', other_name: '', status: '', description: '', cover: ''};
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeSlug = this.handleChangeSlug.bind(this);
		this.handleChangeOtherName = this.handleChangeOtherName.bind(this);
		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleChangeCover = this.handleChangeCover.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.alertSuccess = this.alertSuccess.bind(this);
		this.alertError = this.alertError.bind(this);
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
		let slug = Helper.changeToSlug(e.target.value.trim());
		this.setState({
			name: e.target.value.trim(),
			slug: slug
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
		const manga = {
			name: this.state.name,
			slug: this.state.slug,
			other_name: this.state.other_name,
			status: this.state.status,
			description: this.state.description,
			cover: this.state.cover
		}
		for(let key in manga){
			if (manga.hasOwnProperty(key)) {
				console.log(manga[key]);
		        if(!manga[key]) {
		        	this.alertError({title: 'Fail', text: key + ' cannot be empty'});
		        	return;
		        }
		    }
		}
		let uri = '/mangas';
		axios.post(uri, manga).then((response) => {
			console.log(response);
			if(response.data.code === 200){
				this.alertSuccess({title: 'Success', text: response.data.message});
			} else {
				this.alertError({title: 'Error', text: response.data.message});
			}
			// browserHistory.push('/display-item');
		});
	}
	componentDidMount(){
		document.title = 'Add Manga';
	}
	render(){
		return (
				<div>
					<Breadcrumb activePage="Add manga" />
					<div className="card">
						<div className="card-body">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="inputEmail3" placeholder="Tây Du" onChange={this.handleChangeName}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Slug</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="inputPassword3" placeholder="/tay-du" value={this.state.slug} onChange={this.handleChangeSlug}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Other Name</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="inputEmail3" placeholder="To the West" onChange={this.handleChangeOtherName}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Status</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="status" placeholder="New, Hot, Đang Tiến Hành" onChange={this.handleChangeStatus}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Description</label>
									<div className="col-sm-10">
										<textarea className="form-control" onChange={this.handleChangeDescription} rows="5"></textarea>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Cover</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="inputEmail3" placeholder="http://mangak.info/wp-content/uploads/2014/08/black-haze-187x250.jpg"
										onChange={this.handleChangeCover} />
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-10">
										<button className="btn btn-info">Add</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<ToastContainer ref={(input) => {this.container = input;}}
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"
                        preventDuplicates={true} />
				</div>
			)
	}
}