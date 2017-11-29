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

import cheerio from 'cheerio';

import Breadcrumb from '../_shared/Breadcrumb';

export default class AddChapter extends Component {
	constructor(props){
		super(props);
		this.state = {source: 'mangak', chap: '', name: '', slug: '', status: '', content: '' };
		this.handleChangeSource = this.handleChangeSource.bind(this);
		this.handleChangeChap = this.handleChangeChap.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeSlug = this.handleChangeSlug.bind(this);
		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleChangeContentURL = this.handleChangeContentURL.bind(this);
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

  	handleChangeSource(e) {
  		this.setState({
  			source: e.target.value.trim()
  		});
  	}

  	handleChangeChap(e){
		this.setState({
			chap: e.target.value.trim()
		})
	}
	handleChangeName(e){
		this.setState({
			name: e.target.value.trim()
		});
	}
	handleChangeSlug(e){
		this.setState({
			slug: e.target.value.trim()
		})
	}
	
	handleChangeStatus(e){
		this.setState({
			status: e.target.value.trim()
		})
	}
	handleChangeContentURL(e){
		let source = this.state.source;
		var pageToVisit = e.target.value.trim();
		console.log("Visiting page " + pageToVisit);

		let contentLoad = '';
		let name = '';
		fetch(pageToVisit)
	  	.then((resp) => resp.text()) // Transform the data into json
	  	.then(function(data) {
		    console.log(data);
		    var $ = cheerio.load(data);
		    if(source === 'mangak'){
			    contentLoad = $('.vung_doc').html(); 
			    console.log(contentLoad);
			    name = $('.entry-title').text();
			}
			if(source === 'comicvn'){
				contentLoad = $('#image-load').html(); 
				console.log(contentLoad);
			    name = $('.entry-title').text();
			}
			return {contentLoad: contentLoad, name: name};

	   	}).then((data)=>{
	   		
	    	this.setState({
	    		content: data.contentLoad, name: data.name
	    	});
	    	console.log(this.state.content);
	   	});
		 
	}

	handleSubmit(e){
		e.preventDefault();
		const chapter = {
			chap: this.state.chap,
			name: this.state.name,
			slug: this.state.slug,
			status: this.state.status,
			content: this.state.content
		}
		console.log(chapter);
		// let uri = '/chapters';
		// axios.post(uri, chapter).then((response) => {
		// 	console.log(response);
		// 	if(response.data.code === 200){
		// 		this.alertSuccess({title: 'Success', text: response.data,message});
		// 	} else {
		// 		this.alertError({title: 'Error', text: response.data.message});
		// 	}
		// 	// browserHistory.push('/display-item');
		// });
	}
	componentDidMount(){
		document.title = 'Add Chapter';
	}
	render(){
		return (
				<div>
					<Breadcrumb activePage="Add chapter" />
					<div className="card">
						<div className="card-body">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group row">
									<label htmlFor="chap" className="col-sm-2 col-form-label">Source</label>
									<div className="col-sm-10">								
										<select className="form-control" id="source" onChange={this.handleChangeSource} value={this.state.source}>
											<option value="mangak">MangaK</option>
											<option value="comicvn">Comicvn</option>
										</select>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="chap" className="col-sm-2 col-form-label">Chap</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="chap" placeholder="" onChange={this.handleChangeChap} required/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="name" placeholder="Thiên Vương Chi Nộ" onChange={this.handleChangeName} value={this.state.name}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Slug</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="slug" placeholder="/tay-du-chap-1" onChange={this.handleChangeSlug}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Status</label>
									<div className="col-sm-10">
										<select className="form-control" id="status" onChange={this.handleChangeStatus}>
											<option value="new">New</option>
											<option value="cam">Cam</option>
											<option value="raw">Raw</option>
										</select>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Content URL</label>
									<div className="col-sm-10">
										<input className="form-control" id="content-url" onChange={this.handleChangeContentURL} />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Content</label>
									<div className="col-sm-10">
										<textarea className="form-control" id="content-chapter" onChange={this.handleChangeContent} value={this.state.content}></textarea>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-10">
										<button className="btn btn-info">Add</button>
									</div>
								</div>
							</form>

							<div className="row" dangerouslySetInnerHTML={{ __html: this.state.content }}>
							</div>
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